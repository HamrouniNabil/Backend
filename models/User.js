const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  password: String,
  phone: { type: String, required: true },
  role: {
    type: String,
    // default: "User",
    enum: ["Admin", "Agent", "User"],
  },
});

module.exports = User = mongoose.model("user", userSchema);
