const mongoose = require("mongoose");
const orderItemSchema = require('./orderItemModel');

const shippingSchema = {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  };
  
  const paymentSchema = {
    paymentMethod: { type: String, required: true }
  };

  const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [orderItemSchema],
    shipping: shippingSchema,
    payment: paymentSchema,
    itemsPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Order', orderSchema);