import mongoose from "mongoose";
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
    bankName: { type: String, required: true },
    branch: { type: String, required: true },
    upi: { type: String, default: "" },
    razorpayContactId: { type: String, default: "" },
    razorpayFundAccountId: { type: String, default: "" },
  },
  { timestamps: true }
);

const bankModel =
  mongoose.models.BankDetails ||
  mongoose.model("BankDetails", bankDetailsSchema);
export default bankModel;
