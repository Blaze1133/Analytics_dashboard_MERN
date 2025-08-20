const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: String,
  cost: String,
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    of: Number,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
