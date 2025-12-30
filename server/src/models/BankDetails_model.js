import mongoose from "mongoose";
const FundAccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    razorpayContactId: { type: String, required:true},
    razorpayFundAccountId: { type: String, required:true },
  },
  { timestamps: true }
);

const FundAccount =
  mongoose.models.FundAccount ||
  mongoose.model("FundAccount", FundAccountSchema);
export default FundAccount;
