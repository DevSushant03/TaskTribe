const mongoose = require("mongoose");

const bankDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },

    accountHolder: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifsc: { type: String, required: true },

    razorpayContactId: { type: String, default: "" },
    razorpayFundAccountId: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BankDetails", bankDetailsSchema);
