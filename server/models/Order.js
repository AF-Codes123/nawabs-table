const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [
      {
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
        name: String,
        price: Number,
        quantity: { type: Number, default: 1 },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Received', 'Cooking', 'Packing', 'On the way', 'Delivered'],
      default: 'Received',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);