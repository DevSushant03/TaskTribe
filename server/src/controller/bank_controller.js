import bankModel from "../models/BankDetails_model.js";

export const addBankDetails = async (req, res) => {
  try {
    const { userid } = req.user;
    const { accountHolder, accountNumber, ifsc, bankName, branch, upi } =
      req.body;
    console.log(accountHolder);

    let bank = await bankModel.findOne({ userid });

    if (bank) {
      // Update existing
      const updated = await bankModel.findOneAndUpdate({ userid }, data, {
        new: true,
      });

      return res.json({
        success: true,
        message: "Bank details updated.",
        bank: updated,
      });
    }

    // Create new
    const newBank = new bankModel({
      userId: userid,
      accountHolder,
      accountNumber,
      ifsc,
      bankName,
      branch,
      upi,
    });
    await newBank.save();

    res.json({
      success: true,
      message: "Bank details saved successfully.",
      bank: newBank,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
