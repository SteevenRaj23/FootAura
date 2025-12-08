const Product = require("../models/Product");
const { getCache, setCache } = require("../utils/cache");

exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (e) {
    next(e);
  }
};

// exports.getProducts = async (req, res, next) => {
//   try {
//     const { q, brand, category, min, max, size } = req.query;
//     const filter = {};

//     if (q) filter.$text = { $search: q };
//     if (brand) filter.brand = brand;
//     if (category) filter.category = category;
//     if (min || max)
//       filter.price = {
//         ...(min && { $gte: Number(min) }),
//         ...(max && { $lte: Number(max) }),
//       };
//     if (size)
//       filter.sizes = { $elemMatch: { size: Number(size), stock: { $gt: 0 } } };

//     const products = await Product.find(filter).sort("-createdAt");
//     res.json(products);
//   } catch (e) {
//     next(e);
//   }
// };

exports.getProducts = async (req, res, next) => {
  try {
    const cacheKey = "products";

    // 1. Try Redis first
    const cached = await getCache(cacheKey);
    if (cached) return res.json({ fromCache: true, data: cached });

    // 2. Fetch from Mongo
    const products = await Product.find().sort("-createdAt");

    // 3. Save to Redis
    await setCache(cacheKey, products, 3600); // 1 min

    res.json({ fromCache: false, data: products });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (e) {
    next(e);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (e) {
    next(e);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (e) {
    next(e);
  }
};
