const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true
  },

  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  amount: Number, // in INR
  currency: { type: String, default: "INR" },

  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,

  payoutId: { type: String, default: null },

  status: {
    type: String,
    enum: [
      "created",       // order created
      "escrow_hold",   // payment captured + held
      "released",      // paid to freelancer
      "refunded",      // refunded to client
      "failed"
    ],
    default: "created"
  }

}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
