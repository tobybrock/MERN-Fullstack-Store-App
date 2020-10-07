const router = require("express").Router();
const Order = require("../models/orderModel");
const { isAuth, isAdmin } = require('../../auth');

router.get("/", isAuth, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user");
    res.send(orders);
  } catch (err) {
    res.status(404).send("No orders found", err);
  }
});

router.get("/mine", isAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  } catch (err) {
    res.status(404).send("No orders found for user", err);
  }
});

router.get("/:id", isAuth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    res.send(order);
  } catch (err) {
    res.status(404).send("Order not found", err);
  }
});

router.post("/", isAuth, async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });
  try {
    const newOrderCreated = await newOrder.save();
    res
      .status(201)
      .send({ message: "New Order Created", data: newOrderCreated });
  } catch (err) {
    res.status(400).send("Order can't be created at this moment", err);
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } catch (err) {
    res.status(404).send("Order not found", err);
  }
});

router.put("/:id/pay", isAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: "paypal",
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID,
      },
    };
    const updatedOrder = await order.save();
    res.send({ message: "Order Paid.", order: updatedOrder });
  } catch (err) {
    res.status(404).send("Order not found.", err);
  }
});

module.exports = router;
