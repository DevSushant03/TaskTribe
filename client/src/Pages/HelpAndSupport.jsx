import React, { useState } from "react";
import { toast } from "react-toastify";

export default function HelpAndSupport() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    // TODO: connect API here
    setTimeout(() => {
      setLoading(false);
      toast.success("Support request submitted successfully!");
    }, 1500);
  };

  return (
    <div className="w-full h-full mt-20 md:mt-0 bg-[#050505] text-white px-4 py-6 md:py-8 flex flex-col justify-center overflow-y-scroll">
      {/* Card */}
      <div className="h-full mx-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2 break-words">
            Help & <span className="text-[#FF6B00]">Support</span>
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl break-words">
            Need assistance with a task, payment, or your account? Submit your
            request below and a member of the TaskTribe support team will
            personally review and respond.
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium tracking-wide text-zinc-300 uppercase">
              Full name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              required
              className="w-full max-w-full bg-[#0f0f0f] border border-zinc-700/80 rounded-lg px-4 py-2.5
              text-sm text-zinc-100 placeholder:text-zinc-500
              break-words overflow-hidden
              focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium tracking-wide text-zinc-300 uppercase">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="w-full max-w-full bg-[#0f0f0f] border border-zinc-700/80 rounded-lg px-4 py-2.5
              text-sm text-zinc-100 placeholder:text-zinc-500
              break-words overflow-hidden
              focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition"
            />
            <p className="text-[11px] text-zinc-500 break-words overflow-hidden">
              Please use the email associated with your TaskTribe account to
              help us identify your profile more efficiently.
            </p>
          </div>

          {/* Issue Category */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium tracking-wide text-zinc-300 uppercase">
              Issue category
            </label>
            <select
              required
              className="w-full max-w-full bg-[#0f0f0f] border border-zinc-700/80 rounded-lg px-4 py-2.5
              text-sm text-zinc-100
              focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition"
            >
              <option value="">Select an issue</option>
              <option value="task">Task related</option>
              <option value="payment">Payment / Wallet</option>
              <option value="account">Account / Profile</option>
              <option value="chat">Chat / Communication</option>
              <option value="report">Report a user</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium tracking-wide text-zinc-300 uppercase">
              Describe your issue
            </label>
            <textarea
              rows={5}
              required
              placeholder="Describe the issue you’re facing, including any error messages, task IDs, or transaction references if available."
              className="w-full max-w-full bg-[#0f0f0f] border border-zinc-700/80 rounded-lg px-4 py-2.5
              text-sm text-zinc-100 placeholder:text-zinc-500 resize-none
              break-words overflow-x-hidden overflow-y-auto
              focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition"
            />
            <p className="text-[11px] text-zinc-500 break-words overflow-hidden">
              Providing clear details helps us investigate accurately and
              resolve your issue faster.
            </p>
          </div>

          {/* Privacy */}
          <p className="text-[11px] text-zinc-500 leading-relaxed break-words border-t border-zinc-800/70 pt-4">
            Your information is handled with care. Information submitted here is
            used only to process this support request and will not be shared
            with third parties.
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2
            bg-[#FF6B00] hover:bg-orange-600 disabled:bg-orange-800
            disabled:cursor-not-allowed text-black font-medium text-sm
            py-2.5 rounded-lg shadow-[0_0_30px_rgba(255,107,0,0.35)] transition"
          >
            {loading ? "Sending your request..." : "Submit support request"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-[11px] text-zinc-500 text-center break-words">
          TaskTribe is currently in early access. Support responses may take up
          to 24 hours, but every request is reviewed by a member of the team.
        </div>
        </div>
    </div>
  );
}
