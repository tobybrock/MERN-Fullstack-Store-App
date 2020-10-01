const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  displayName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  isAdmin: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("User", userSchema);