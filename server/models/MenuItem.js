const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ['BBQ', 'Karahi', 'Rice', 'Bread', 'Dessert', 'Drinks'],
      required: true,
    },
    image: { type: String, default: '' },
    isSpicy: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 4 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);