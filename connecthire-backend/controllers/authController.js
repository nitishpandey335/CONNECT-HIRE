const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const { name, username, email, password, role, company } = req.body;
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) return res.status(400).json({ error: 'User already exists' });
    const user = new User({ name, username, email, password, role, company });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Generate a simple 6-digit numeric OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.requestOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const otp = generateOtp();
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(otp, salt);

    user.otpCodeHash = otpHash;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    try {
      const { sendEmail } = require('../services/emailService');
      const result = await sendEmail({
        to: user.email,
        subject: 'Your ConnectHire OTP Code',
        text: `Your OTP code is ${otp}. It expires in 10 minutes.`
      });
      
      if (result.mode === 'ethereal' && result.previewUrl) {
        return res.json({ 
          message: 'OTP sent successfully!', 
          emailMode: 'preview',
          previewUrl: result.previewUrl,
          note: 'Click the preview link to view your OTP email'
        });
      } else if (result.mode === 'console') {
        return res.json({ 
          message: 'OTP generated successfully!', 
          emailMode: 'console',
          note: 'Check server console for OTP details'
        });
      } else {
        return res.json({ 
          message: 'OTP sent to your email!',
          emailMode: 'smtp'
        });
      }
    } catch (e) {
      console.log('📧 OTP for', user.email, '=>', otp);
      return res.json({ 
        message: 'OTP generated successfully!', 
        emailMode: 'console',
        note: 'Check server console for OTP details'
      });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const otp = generateOtp();
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(otp, salt);

    user.otpCodeHash = otpHash;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    try {
      const { sendEmail } = require('../services/emailService');
      const result = await sendEmail({
        to: user.email,
        subject: 'Your ConnectHire OTP Code',
        text: `Your OTP code is ${otp}. It expires in 10 minutes.`
      });
      
      if (result.mode === 'ethereal' && result.previewUrl) {
        return res.json({ 
          message: 'OTP resent successfully!', 
          emailMode: 'preview',
          previewUrl: result.previewUrl,
          note: 'Click the preview link to view your OTP email'
        });
      } else if (result.mode === 'console') {
        return res.json({ 
          message: 'OTP regenerated successfully!', 
          emailMode: 'console',
          note: 'Check server console for OTP details'
        });
      } else {
        return res.json({ 
          message: 'OTP resent to your email!',
          emailMode: 'smtp'
        });
      }
    } catch (e) {
      console.log('📧 OTP for', user.email, '=>', otp);
      return res.json({ 
        message: 'OTP regenerated successfully!', 
        emailMode: 'console',
        note: 'Check server console for OTP details'
      });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.verifyOtpLogin = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!user.otpCodeHash || !user.otpExpiresAt) return res.status(400).json({ error: 'OTP not requested' });
    if (user.otpExpiresAt.getTime() < Date.now()) return res.status(400).json({ error: 'OTP expired' });

    const isMatch = await bcrypt.compare(otp, user.otpCodeHash);
    if (!isMatch) return res.status(400).json({ error: 'Invalid OTP' });

    // Invalidate OTP after successful login
    user.otpCodeHash = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
