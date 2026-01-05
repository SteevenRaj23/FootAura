const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getCart, addToCart, updateItem, clearCart, deleteItem } = require('../controllers/cartController');

router.use(auth);

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update', updateItem);
router.delete('/remove',deleteItem);
router.delete('/clear', clearCart);

module.exports = router;
