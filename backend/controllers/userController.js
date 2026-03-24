const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendThankYouEmail = async (email, username) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You For Your Feedback!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
          <h2 style="color: #4f46e5;">Hello ${username},</h2>
          <p style="color: #475569; font-size: 16px; line-height: 1.5;">
            We genuinely appreciate the time you took to share your thoughts with us. Your feedback is crucial for our continuous improvement and helps us serve you better.
          </p>
          <p style="color: #475569; font-size: 16px; line-height: 1.5;">
            If you ever need further assistance, feel free to reply directly to this email!
          </p>
          <br />
          <p style="color: #94a3b8; font-size: 14px;">Best Regards,<br><strong>The Feedback System Team</strong></p>
        </div>
      `
    };
    await transporter.sendMail(mailOptions);
    console.log('Thank you email sent to ' + email);
  } catch (error) {
    console.error('Email sending failed', error);
  }
};

const checkUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (user) {
      if (user.has_submitted) {
        return res.status(200).json({ exists: true, message: 'You have already responded', has_submitted: true });
      }
      return res.status(200).json({ exists: true, message: 'User found but has not submitted', has_submitted: false });
    }
    return res.status(200).json({ exists: false });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const saveUser = async (req, res) => {
  try {
    const { username, email, phone } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'User already exists' });
    }
    
    user = new User({ username, email, phone });
    await user.save();
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const generateQr = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    if (user.has_submitted) {
      return res.status(400).json({ message: 'User has already submitted feedback' });
    }

    // Generate token
    const token = uuidv4();
    user.token = token;
    
    // Assuming frontend runs on localhost:5173 for local environment.
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const formUrl = `${frontendUrl}/feedback?token=${token}`;
    
    // Generate QR
    const qrCodeImage = await QRCode.toDataURL(formUrl);
    user.qr_code_url = qrCodeImage;
    await user.save();

    res.status(200).json({ success: true, qrCode: qrCodeImage, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const validateToken = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ valid: false, message: 'Token is required' });

    const user = await User.findOne({ token });
    if (!user) return res.status(400).json({ valid: false, message: 'Invalid token' });
    if (user.has_submitted) return res.status(400).json({ valid: false, message: 'You have already responded' });
    
    // Valid token
    return res.status(200).json({ valid: true, googleFormUrl: process.env.GOOGLE_FORM_URL });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const submitFeedback = async (req, res) => {
  try {
    const { token, feedback } = req.body;
    if (!token) return res.status(400).json({ message: 'Token is required' });

    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.has_submitted = true;
    if (feedback) {
      user.feedback = feedback;
    }
    await user.save();
    
    // Send background email securely after user record is updated
    sendThankYouEmail(user.email, user.username);
    
    res.status(200).json({ success: true, message: 'Feedback marked as submitted and email sent.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  checkUser,
  saveUser,
  generateQr,
  validateToken,
  submitFeedback,
};
