const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');


// ===============================
// CREATE ORDER
// ===============================
exports.createOrder = async (req, res, next) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    console.log(shippingAddress, paymentMethod);

    // Get user cart
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Validate stock & calculate total
    let totalAmount = 0;

    for (const item of cart.items) {
      const product = await Product.findById(item.productId);

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      const sizeRow = product.sizes.find(s => s.size === item.size);
      if (!sizeRow || sizeRow.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${product.name}, size ${item.size}` });
      }

      totalAmount += product.price * item.quantity;
    }

    // Deduct stock for each item
    for (const item of cart.items) {
      await Product.updateOne(
        { _id: item.productId, "sizes.size": item.size },
        { $inc: { "sizes.$.stock": -item.quantity } }
      );
    }

    // Prepare order items with product info
    const orderItems = await Promise.all(
      cart.items.map(async i => {
        const p = await Product.findById(i.productId);
        return {
          productId: i.productId,
          name: p.name,
          size: i.size,
          quantity: i.quantity,
          price: p.price
        };
      })
    );

    // Create order
    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || "cod",
      paymentStatus: "pending",
      totalAmount
    });

    // Clear user cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};


// ===============================
// GET ALL ORDERS OF LOGGED-IN USER
// ===============================
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort("-createdAt");
    res.json(orders);
  } catch (err) {
    next(err);
  }
};


// ===============================
// UPDATE ORDER STATUS (Admin Use)
// ===============================
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { orderStatus } },
      { new: true }
    );

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    next(err);
  }
};
