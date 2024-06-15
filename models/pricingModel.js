const mongoose = require('mongoose');

const PricingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  parcelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parcel',
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Pricing', PricingSchema);
