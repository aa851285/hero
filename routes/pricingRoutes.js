const express = require('express');
const router = express.Router();
const { createPricing, getPricingByUser } = require('../controllers/pricingController');
const { protect } = require('../middlewares/authMiddleware'); // Ensure you have this middleware implemented

// Route to create a new pricing entry
router.post('/', protect, createPricing);

// Route to fetch all pricing entries for a user
router.get('/', protect, getPricingByUser);

module.exports = router;
