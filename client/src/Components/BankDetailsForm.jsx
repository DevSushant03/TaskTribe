import React, { useState } from "react";

export default function BankDetailsForm() {
  const [form, setForm] = useState({
    accountHolder: "",
    accountNumber: "",
    ifsc: "",
    bankName: "",
    branch: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="w-full bg-[#121212] p-8 ">
      <h2 className="text-3xl font-semibold text-white mb-2">
        Bank <span className="text-[#FF6B00]">Details</span>
      </h2>
      <p className="text-[#B5B5B5] mb-6 text-sm">
        Enter your bank details carefully. These details will be used for
        payout.
      </p>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Account Number */}
        <div className="flex flex-col gap-2">
          <label className="text-[#B5B5B5] text-sm">Account Number</label>
          <input
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
            className="bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 rounded-xl focus:border-[#FF6B00] outline-none"
            placeholder="Confirm account number"
          />
        </div>

        {/* IFSC Code */}
        <div className="flex flex-col gap-2">
          <label className="text-[#B5B5B5] text-sm">IFSC Code</label>
          <input
            type="text"
            className="bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 rounded-xl focus:border-[#FF6B00] outline-none"
            placeholder="Enter IFSC code"
          />
        </div>

        {/* Bank Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[#B5B5B5] text-sm">Bank Name</label>
          <input
            type="text"
            className="bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 rounded-xl focus:border-[#FF6B00] outline-none"
            placeholder="Enter bank name"
          />
        </div>

        {/* Branch Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[#B5B5B5] text-sm">Branch Name</label>
          <input
            type="text"
            className="bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 rounded-xl focus:border-[#FF6B00] outline-none"
            placeholder="Enter branch name"
          />
        </div>

        {/* Account Holder Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[#B5B5B5] text-sm">Account Holder Name</label>
          <input
            type="text"
            className="bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 rounded-xl focus:border-[#FF6B00] outline-none"
            placeholder="Enter holder name"
          />
        </div>

        {/* UPI ID Full Width */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-[#B5B5B5] text-sm">UPI ID (Optional)</label>
          <input
            type="text"
            className="bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 rounded-xl focus:border-[#FF6B00] outline-none"
            placeholder="example@upi"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end mt-4">
          <button className="px-8 py-3 bg-[#FF6B00] hover:bg-[#FF7E26] text-white font-semibold rounded-xl shadow-md transition">
            Save Bank Details
          </button>
        </div>
      </form>
    </div>
  );
}
