const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory OTP store: { [email]: { code: '123456', expiresAt: Date } }
const otpStore = {};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Debug log (only for development)
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS exists?', !!process.env.EMAIL_PASS);

// Simple health-check
app.get('/', (req, res) => {
  res.send('OTP server is running');
});

// Send OTP endpoint
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  // Store OTP in memory
  otpStore[email] = { code: otp, expiresAt };

  const mailOptions = {
    from: process.env.EMAIL_USER || 'your-email@gmail.com',
    to: email,
    subject: 'Your Codera sign-up OTP',
    text: `Your OTP for Codera sign up is: ${otp}\n\nThis code is valid for 5 minutes.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP ${otp} sent to ${email}`);
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    // Fallback: log OTP to console
    console.log(`✨ OTP for ${email}: ${otp} (Email failed, using console)`);
    res.json({
      success: true,
      message: 'OTP sent successfully (check console - email service unavailable)',
      fallback: true
    });
  }
});

// Verify OTP endpoint
app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, error: 'Email and OTP are required' });
  }

  const record = otpStore[email];

  if (!record) {
    return res.status(400).json({ success: false, error: 'No OTP found for this email. Please request a new one.' });
  }

  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ success: false, error: 'OTP expired. Please request a new one.' });
  }

  if (record.code !== otp) {
    return res.status(400).json({ success: false, error: 'Invalid OTP. Please try again.' });
  }

  // OTP is correct – mark verified and delete from store
  delete otpStore[email];
  return res.json({ success: true, message: 'OTP verified successfully' });
});

const PORT = process.env.OTP_PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 OTP server running on http://localhost:${PORT}`);
});
