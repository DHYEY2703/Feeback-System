const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    unique: true,
    sparse: true, // allows null/undefined values to be ignored in unique index
  },
  qr_code_url: {
    type: String,
  },
  has_submitted: {
    type: Boolean,
    default: false,
  },
  feedback: {
    type: mongoose.Schema.Types.Mixed,
  },
}, {
  timestamps: true // Automatically creates 'createdAt' and 'updatedAt'
});

const User = mongoose.model('User', userSchema);

module.exports = User;
