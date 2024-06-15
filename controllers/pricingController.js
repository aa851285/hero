const Pricing = require('../models/pricingModel');
const Parcel = require('../models/parcelModel');

// Create a new pricing entry
exports.createPricing = async (req, res) => {
  try {
    const { parcelId, price } = req.body;
    const userId = req.user._id; // Get the authenticated user's ID

    // Check if the parcel exists
    const parcel = await Parcel.findById(parcelId);
    if (!parcel) {
      return res.status(404).json({ error: 'Parcel not found' });
    }

    // Create a new pricing entry
    const newPricing = new Pricing({
      userId,
      parcelId,
      price
    });
    await newPricing.save();

    res.status(201).json({ message: 'Pricing entry created successfully', pricing: newPricing });
  } catch (error) {
    console.error('Error creating pricing entry:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Fetch all pricing entries for a user
exports.getPricingByUser = async (req, res) => {
  try {
    const userId = req.user._id; // Get the authenticated user's ID
    const pricingEntries = await Pricing.find({ userId }).populate('parcelId');

    res.status(200).json(pricingEntries);
  } catch (error) {
    console.error('Error fetching pricing entries:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
