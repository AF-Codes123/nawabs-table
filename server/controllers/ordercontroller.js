const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { customerName, phone, address, items, totalPrice } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart khali hai' });
    }
    const order = await Order.create({
      user: req.user ? req.user._id : undefined,
      customerName,
      phone,
      address,
      items,
      totalPrice,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order nahi mila' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: 'Order nahi mila' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};