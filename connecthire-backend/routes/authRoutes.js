const express = require('express');
const router = express.Router();
const { signup, login, requestOtp, verifyOtpLogin, resendOtp } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtpLogin);
router.post('/resend-otp', resendOtp);

// Example route
router.get('/', (req, res) => {
  res.send('Auth route working');
});

module.exports = router;
