const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(express.json());
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174', process.env.FRONTEND_URL],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
