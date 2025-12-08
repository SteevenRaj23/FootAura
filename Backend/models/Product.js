const mongoose = require('mongoose');


const sizeSchema = new mongoose.Schema(
{ size: Number, stock: { type: Number, default: 0 } },
{ _id: false }
);


const productSchema = new mongoose.Schema(
{
name: { type: String, required: true, index: 'text' },
brand: { type: String, required: true, index: true },
description: String,
price: { type: Number, required: true },
category: { type: String, index: true },
images: [String],
sizes: [sizeSchema],
colors: [String],
isFeatured: { type: Boolean, default: false },
},
{ timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);