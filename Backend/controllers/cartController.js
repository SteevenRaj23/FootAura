const Cart = require('../models/Cart');
const Product = require('../models/Product');


// ==========================
// GET CART
// ==========================
exports.getCart = async (req, res, next) => {
  try {
    const cart =
      (await Cart.findOne({ userId: req.user._id }).populate("items.productId")) ||
      { userId: req.user._id, items: [] };

    res.json(cart);
  } catch (e) {
    next(e);
  }
};


// ==========================
// ADD TO CART
// ==========================
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, size, quantity } = req.body;
    
    console.log(productId, size, quantity);
    // Check product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check stock
    const sizeRow = product.sizes.find(s => s.size === Number(size));
    if (!sizeRow || sizeRow.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock for this size" });
    }

    // Get or create cart
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) cart = await Cart.create({ userId: req.user._id, items: [] });

    // Check if same product with same size already exists
    const index = cart.items.findIndex(
      item =>
        item.productId.toString() === productId &&
        item.size === Number(size)
    );

    if (index > -1) {
      cart.items[index].quantity += Number(quantity);
    } else {
      cart.items.push({
        productId,
        size: Number(size),
        quantity: Number(quantity),
      });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (e) {
    next(e);
  }
};


// ==========================
// UPDATE AN ITEM (quantity)
// ==========================
exports.updateItem = async (req, res, next) => {
  try {
    const { productId, size, quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.items.findIndex(
      item =>
        item.productId.toString() === productId &&
        item.size === Number(size)
    );

    if (index === -1)
      return res.status(404).json({ message: "Item not found in cart" });

    if (quantity <= 0) {
      cart.items.splice(index, 1); // remove item
    } else {
      cart.items[index].quantity = Number(quantity);
    }

    await cart.save();
    res.json(cart);
  } catch (e) {
    next(e);
  }
};


// ==========================
// CLEAR CART
// ==========================
exports.clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { items: [] } },
      { new: true }
    );

    res.json(cart || { userId: req.user._id, items: [] });
  } catch (e) {
    next(e);
  }
};
