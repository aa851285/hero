const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

const cors = require('cors');
app.use(cors());

const authRoutes = require('./routes/authRoutes');
const parcelRoutes = require('./routes/parcelRoutes');
const pricingRoutes = require('./routes/pricingRoutes');

// Use Routes
app.use('/users', authRoutes);
app.use('/parcels', parcelRoutes);
app.use('/pricing', pricingRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Basic Test Route
app.get('/home', (req, res) => {
  res.send('Hello world...');
});


// Basic Test Route
app.get('/user', (req, res) => {
  res.send('User Route Test...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  connectTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 30000   // 30 seconds
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
