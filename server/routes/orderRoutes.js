const router = require('express').Router();
const {
  createOrder, getOrder, getAllOrders, updateStatus,
} = require('../controllers/ordercontroller');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', createOrder);
router.get('/', protect, adminOnly, getAllOrders);
router.get('/:id', getOrder);
router.put('/:id/status', protect, adminOnly, updateStatus);

module.exports = router;