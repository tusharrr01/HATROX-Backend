const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  images: [
    {
      url: {
        type: String,
        required: true
      },
      public_id: {
        type: String,
        required: true
      },
    }
  ],
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
  },
  discountPercent: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  isTopDeal: {
    type: Boolean,
    default: false,
  },
  bgcolor: {
    type: String,
  },
  textcolor: {
    type: String,
  },
  pannelcolor: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});



module.exports = mongoose.model("product", productSchema);