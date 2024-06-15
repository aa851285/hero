const express = require('express');
const router = express.Router();
const { createParcel, getParcels } = require('../controllers/parcelController');
const { protect } = require('../middlewares/authMiddleware'); // Ensure you have this middleware implemented

// Create a new parcel
router.post('/', protect, createParcel);

// Get all parcels
router.get('/', protect, getParcels);

module.exports = router;
