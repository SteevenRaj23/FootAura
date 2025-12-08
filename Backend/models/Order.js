const mongoose = require('mongoose');


// Order Item Schema
const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: { type: String, required: true },
    size: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  { _id: false }
);


// Address Schema
const addressSchema = new mongoose.Schema(
  {
    house: String,
    city: String,
    state: String,
    pincode: String
  },
  { _id: false }
);


// Main Order Schema
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    items: [orderItemSchema],

    shippingAddress: addressSchema,

    paymentMethod: {
      type: String,
      enum: ['cod', 'razorpay', 'stripe', 'upi'],
      default: 'cod'
    },

    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending'
    },

    orderStatus: {
      type: String,
      enum: ['processing', 'shipped', 'delivered', 'cancelled'],
      default: 'processing'
    },

    totalAmount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model('Order', orderSchema);
