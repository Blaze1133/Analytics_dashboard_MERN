const mongoose = require("mongoose");

const ProductScehma = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductScehma);
