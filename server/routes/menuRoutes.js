const router = require('express').Router();
const {
  getMenu, createItem, updateItem, deleteItem,
} = require('../controllers/menucontroller');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getMenu);
router.post('/', protect, adminOnly, createItem);
router.put('/:id', protect, adminOnly, updateItem);
router.delete('/:id', protect, adminOnly, deleteItem);

module.exports = router;