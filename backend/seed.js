const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Admin.deleteMany(); // Clear existing
    
    // Create new admin
    const adminUser = new Admin({
      username: 'admin',
      password: 'password123'
    });

    await adminUser.save();

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
