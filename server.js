const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const allowCors = require('./middlewares/allowCors'); // Adjust the path as needed

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Apply CORS middleware globally
app.use(allowCors);

// Import Routes
const authRoutes = require('./routes/authRoutes');
const parcelRoutes = require('./routes/parcelRoutes');
const pricingRoutes = require('./routes/pricingRoutes');

// Use Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/parcels', parcelRoutes);
app.use('/api/v1/pricing', pricingRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Basic Test Route
app.get('/home', (req, res) => {
  res.send('Hello world...');
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
