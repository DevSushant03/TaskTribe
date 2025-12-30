import FundAccount from "../models/BankDetails_model.js";
import userModel from "../models/user_model.js";
import razorpay from "../config/razorpay.js";

export const addBankDetails = async (req, res) => {
  try {
    const { userid } = req.user;
    const { accountNumber, ifsc } = req.body;

    console.log(Object.keys(razorpay));


    if (!accountNumber || !ifsc) {
      return res.json({
        success: false,
        message: "Account number and IFSC are required",
      });
    }

    const user = await userModel.findById(userid);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const isfundAccExist = await FundAccount.findOne({ userId: userid });
    if (isfundAccExist) {
      return res.json({
        success: false,
        message: "Fund account already exists",
      });
    }

    const contact = await razorpay.contacts.create({
      name: user.name,
      email: user.email,
      type: "vendor",
    });

    const fundAccount = await razorpay.fundAccount.create({
      contact_id: contact.id,
      account_type: "bank_account",
      bank_account: {
        name: user.name,
        ifsc,
        account_number: accountNumber,
      },
    });

    await FundAccount.create({
      userId: userid,
      razorpayContactId: contact.id,
      razorpayFundAccountId: fundAccount.id,
    });
    res.json({
      success: true,
      message: "Bank account verified & linked successfully",
    });
  } catch (error) {
    console.error("Add bank details error:", error);
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
