import React, { useState } from "react";
import { Bank } from "../api/bank_api";
import { bankDetails } from "../validator/BankDetails_validation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function BankDetailsForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    accountNumber: "",
    confirmAccountNumber: "",
    ifsc: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = bankDetails.safeParse(form);
    if (!validation.success) {
      const firstError = validation.error.issues[0].message;
      setError(firstError);
      return;
    }

    if (form.accountNumber !== form.confirmAccountNumber) {
      setError("Account numbers do not match");
      return;
    }

    // const res = await Bank.addBankDetails(form);
    // if (!res.data.success) {
    //   toast.error(res.data.message);
    //   return;
    // }

    toast.success("Bank Account Linked Successfully");
    navigate(`/user/${id}/browse`);
  };

  return (
    <div className="w-full mt-10 md:mt-0 bg-[#050608] p-6 md:p-8 min-h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mt-6 md:mt-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Payout <span className="text-[#FFB347]">Bank Setup</span>
          </h2>
          <p className="text-xs md:text-sm text-[#A5ACB8] mt-2 max-w-xl">
            Enter your bank account number and IFSC to receive payouts securely.
            These details are{" "}
            <span className="text-green-400 font-medium">
              sent over an encrypted connection
            </span>{" "}
            to our banking partner only to create your payout account.
          </p>
        </div>

        {/* Trust badge */}
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="flex items-center gap-2 text-xs text-[#A5ACB8]">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0D151C] border border-[#1E2A36]">
              <span className="text-green-400 text-base">🔒</span>
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-[0.12em] text-[#6C7684]">
                Secure payout setup
              </span>
              <span className="text-xs text-[#D1D5DB]">
                No card or login details required
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Security note */}
      <div className="mt-4 mb-6 rounded-xl border border-[#1A2532] bg-[#050B11] px-4 py-3 text-xs md:text-sm text-[#C4CDD9]">
        <p>
          • Only your <span className="font-medium">account number</span> and{" "}
          <span className="font-medium">IFSC</span> are collected.
        </p>
        <p className="mt-1">
          • These details are used once to create a{" "}
          <span className="font-medium">payout account</span> with our banking
          partner and are <span className="font-medium">never stored</span> in
          our database.
        </p>
        <p className="mt-1">
          • Sharing your account number and IFSC is generally safe for receiving
          money, but always double‑check the details before submitting.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-2"
      >
        {/* Account Number */}
        <div className="flex flex-col gap-2">
          <label className="text-[#D1D5DB] text-sm flex items-center gap-2">
            Account number
            <span className="text-[10px] px-2 py-[2px] rounded-full bg-[#111827] text-[#9CA3AF]">
              Required
            </span>
          </label>
          <input
            name="accountNumber"
            onChange={handleChange}
            type="password"
            inputMode="numeric"
            className="bg-[#020617] border border-[#111827] text-white px-4 py-3 rounded-xl focus:border-[#FFB347] focus:ring-2 focus:ring-[#FFB34733] outline-none placeholder:text-[#4B5563] text-sm"
            placeholder="Enter account number"
            autoComplete="off"
          />
          <p className="text-[11px] text-[#6B7280]">
            Only visible to you on this screen and sent securely for
            verification.
          </p>
        </div>

        {/* Confirm Account Number */}
        <div className="flex flex-col gap-2">
          <label className="text-[#D1D5DB] text-sm">
            Re‑enter account number
          </label>
          <input
            type="password"
            name="confirmAccountNumber"
            onChange={handleChange}
            inputMode="numeric"
            className="bg-[#020617] border border-[#111827] text-white px-4 py-3 rounded-xl focus:border-[#FFB347] focus:ring-2 focus:ring-[#FFB34733] outline-none placeholder:text-[#4B5563] text-sm"
            placeholder="Confirm account number"
            autoComplete="off"
          />
        </div>

        {/* IFSC Code */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-[#D1D5DB] text-sm flex items-center gap-2">
            IFSC code
            <span className="text-[10px] px-2 py-[2px] rounded-full bg-[#111827] text-[#9CA3AF]">
              Required
            </span>
          </label>
          <input
            name="ifsc"
            type="text"
            onChange={handleChange}
            className="bg-[#020617] border border-[#111827] text-white px-4 py-3 rounded-xl focus:border-[#FFB347] focus:ring-2 focus:ring-[#FFB34733] outline-none placeholder:text-[#4B5563] text-sm uppercase tracking-[0.18em]"
            placeholder="e.g. HDFC0001234"
            autoCapitalize="characters"
          />
          <p className="text-[11px] text-[#6B7280]">
            You can find this on your cheque book, passbook, or bank app.
          </p>
        </div>

        {/* Error + Button */}
        <div className="md:col-span-2 flex flex-col md:flex-row md:items-center justify-between gap-3 mt-2">
          <p className="text-red-400 text-xs md:text-sm min-h-[1.25rem]">
            {error}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-xs md:text-sm text-[#9CA3AF] hover:text-[#E5E7EB] rounded-lg border border-transparent hover:border-[#1F2933] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 md:px-8 py-2.5 md:py-3 bg-[#FFB347] hover:bg-[#FFC560] text-[#111827] text-sm font-semibold rounded-xl shadow-md shadow-[#FBBF2440] transition focus:outline-none focus:ring-2 focus:ring-[#FBBF24] focus:ring-offset-2 focus:ring-offset-[#020617]"
            >
              Create payout account
            </button>
          </div>
        </div>
      </form>

      {/* Footer link */}
      <div className="mt-4 text-[11px] md:text-xs text-[#6B7280]">
        By continuing, you agree that your bank details may be shared securely
        with our banking partner only for payout processing.{" "}
        <a
          className="text-[#A5B4FC] underline underline-offset-2"
          href="/PrivacyPolicy"
          target="_blank"
          rel="noopener noreferrer"
        >
          View privacy & security details
        </a>
        .
      </div>
    </div>
  );
}
