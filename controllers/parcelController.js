const Parcel = require('../models/parcelModel');

// Create a new parcel
exports.createParcel = async (req, res) => {
  try {
    const { 
      pickupAddress, 
      dropoffAddress, 
      parcelDetails, 
      size, 
      type, 
      currentLocation, 
      pickupCoordinates, 
      dropoffCoordinates, 
      driverId 
    } = req.body;

    console.log('Received data:', req.body); // Debugging log

    // Simple validation
    if (!pickupAddress || !dropoffAddress || !parcelDetails || !size || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new parcel with customerId set from req.user._id
    const newParcel = new Parcel({ 
      pickupAddress, 
      dropoffAddress, 
      parcelDetails, 
      size, 
      type, 
      currentLocation, 
      pickupCoordinates, 
      dropoffCoordinates, 
      customerId: req.user._id, // Set customerId from authenticated user
      driverId 
    });
    await newParcel.save();

    res.status(201).json({ message: 'Parcel booked successfully', parcel: newParcel });
  } catch (error) {
    console.error('Error creating parcel:', error.message); // Detailed error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Fetch all parcels
exports.getParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find();
    res.status(200).json(parcels);
  } catch (error) {
    console.error('Error fetching parcels:', error.message); // Detailed error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
