const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createOrder, getMyOrders, updateOrderStatus } = require('../controllers/orderController');
const { verifyGanachePayment } = require('../controllers/ethers');

router.use(auth);

router.post('/', createOrder);
router.get('/mine', getMyOrders);
router.patch('/:id/status', updateOrderStatus);
router.post("/metamask/verify", auth, verifyGanachePayment);

module.exports = router;
