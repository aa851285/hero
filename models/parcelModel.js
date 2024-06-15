const mongoose = require('mongoose');

const ParcelSchema = new mongoose.Schema({
  pickupAddress: {
    type: String,
    required: true
  },
  dropoffAddress: {
    type: String,
    required: true
  },
  parcelDetails: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'picked up', 'in transit', 'delivered'],
    default: 'booked'
  },
  currentLocation: {
    type: String
  },
  pickupCoordinates: {
    lat: Number,
    lng: Number
  },
  dropoffCoordinates: {
    lat: Number,
    lng: Number
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Parcel', ParcelSchema);
