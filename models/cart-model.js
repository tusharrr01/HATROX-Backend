const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
      price: {
        type: Number,
        required: true,  // snapshot of current product price
      }
    }
  ],

  discount: {
    type: Number,
    default: 0,
  },

  couponCode: {
    type: String,
  },

  totalAmount: {
    type: Number,
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true,   // mark inactive when converted into an order
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  }
});

module.exports = mongoose.model("cart", cartSchema);
