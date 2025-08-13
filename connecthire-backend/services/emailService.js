const nodemailer = require('nodemailer');

let transporter = null;

const getTransporter = async () => {
  if (transporter) return transporter;
  
  // Try to use configured SMTP first
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    return transporter;
  }
  
  // Use Resend for real emails (free tier available)
  if (process.env.RESEND_API_KEY) {
    transporter = nodemailer.createTransport({
      host: 'smtp.resend.com',
      port: 587,
      secure: false,
      auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY
      }
    });
    return transporter;
  }
  
  // Fallback: Use Ethereal for testing (no real email sent, but OTP works)
  try {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    return transporter;
  } catch (error) {
    // Final fallback: Just log OTP to console
    transporter = {
      sendMail: async ({ to, subject, text }) => {
        console.log('📧 Mock Email:', { to, subject, text });
        return { messageId: 'mock-' + Date.now() };
      }
    };
    return transporter;
  }
};

exports.sendEmail = async ({ to, subject, text, html }) => {
  try {
    const tx = await getTransporter();
    const info = await tx.sendMail({ 
      from: process.env.MAIL_FROM || 'ConnectHire <onboarding@resend.dev>', 
      to, 
      subject, 
      text, 
      html 
    });
    
    // If using Ethereal, return preview URL
    if (info.messageId && info.messageId.includes('mock-')) {
      return { mode: 'console', messageId: info.messageId };
    } else if (info.messageId && nodemailer.getTestMessageUrl) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      return { mode: 'ethereal', previewUrl };
    } else {
      return { mode: 'smtp' };
    }
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
};
