const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      rating: { type: Number, default: 0 },
      comment: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  module.exports = mongoose.model('Review', reviewSchema);