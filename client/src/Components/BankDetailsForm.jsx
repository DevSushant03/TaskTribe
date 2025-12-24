import React, { useState } from "react";
import { Bank } from "../utils/api";
import { bankDetails } from "../Validation/BankDetails_validation";
import { useNavigate, useParams } from "react-router-dom";
export default function BankDetailsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    accountHolder: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifsc: "",
    bankName: "",
    branch: "",
    upi: "",
  });
  const [error, seterror] = useState("");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    seterror("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = bankDetails.safeParse(form);

    if (!validation.success) {
      const firstError = validation.error.issues[0].message;
      seterror(firstError);
      return;
    }

    if (form.accountNumber !== form.confirmAccountNumber) {
      seterror("Account numbers do not match");
      return;
    }
    const res = await Bank.addBankDetails(form);
    if (!res.data.success) {
      toast.error(res.data.message);
    }
    toast.success(res.data.message);
    navigate(`/user/${id}/browse`);
  };

  return (
    <div className="w-full bg-[#121212] p-8 overflow-y-auto">
      <h2 className="text-3xl font-semibold text-white mb-2 mt-10 md:mt-0">
        Bank <span className="text-[#FF6B00]">Details</span>
      </h2>
      <p className="text-[#B5B5B5] mb-6 text-sm leading-relaxed">
        Your bank information is{" "}
        <span className="text-green-400 font-medium">
          encrypted and stored securely
        </span>
        . We use your bank details only for verified payouts — never for any
        other purpose. Learn more about our 
        <a
          className="text-green-500 italic underline"
          href="/PrivacyPolicy"
          target="_blank"
          rel="noopener noreferrer"
        >
         {" "}Security Policy
        </a>
        .
      </p>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Account Number */}
        <div className="flex flex-col gap-2">
          <label className="text-[#B5B5B5] text-sm">Account Number</label>
          <input
            name="accountNumber"
            onChange={handleChange}
            type="text"
            className="bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 rounded-xl focus:border-[#FF6B00] outline-none"
            placeholder="Enter account number"
          />
        </div>

        {/* Confirm Account Number */}
        <div className="flex flex-col gap-2">
          <label className="text-[#B5B5B5] text-sm">
            Re-enter Account Number
          </label>
          <input
            type="text"
            name="confirmAccountNumber"
            onChange={handleChange}
            className="bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 rounded-xl focus:border-[#FF6B00] outline-none"
            placeholder="Confirm account number"
          />
        </div>

        {/* IFSC Code */}
        <div className="flex flex-col gap-2">
          <label className="text-[#B5B5B5] text-sm">IFSC Code</label>
          <input
            name="ifsc"
            type="text"
            onChange={handleChange}
            className="bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 rounded-xl focus:border-[#FF6B00] outline-none"
            placeholder="Enter IFSC code"
          />
        </div>

        {/* Bank Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[#B5B5B5] text-sm">Bank Name</label>
          <input
            name="bankName"
            type="text"
            onChange={handleChange}
            className="bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 rounded-xl focus:border-[#FF6B00] outline-none"
            placeholder="Enter bank name"
          />
        </div>

        {/* Branch Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[#B5B5B5] text-sm">Branch Name</label>
          <input
            name="branch"
            type="text"
            onChange={handleChange}
            className="bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 rounded-xl focus:border-[#FF6B00] outline-none"
            placeholder="Enter branch name"
          />
        </div>

        {/* Account Holder Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[#B5B5B5] text-sm">Account Holder Name</label>
          <input
            name="accountHolder"
            type="text"
            onChange={handleChange}
            className="bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 rounded-xl focus:border-[#FF6B00] outline-none"
            placeholder="Enter holder name"
          />
        </div>

        {/* UPI ID Full Width */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-[#B5B5B5] text-sm">UPI ID (Optional)</label>
          <input
            type="text"
            name="upi"
            onChange={handleChange}
            className="bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 rounded-xl focus:border-[#FF6B00] outline-none"
            placeholder="example@upi"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-between mt-4">
          <p className="text-[#fc0303] text-xl">{error}</p>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-[#FF6B00] hover:bg-[#FF7E26] text-white font-semibold rounded-xl shadow-md transition"
          >
            Save Bank Details
          </button>
        </div>
      </form>
    </div>
  );
}
