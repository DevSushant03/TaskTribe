import React from "react";

export default function ProgressBar({step}) {
  return (
    <div className="space-y-4">
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-900/80">
        <div
          className={`h-full rounded-full bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 transition-all duration-500 ${
            step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-full"
          }`}
        />
      </div>

      <div className="flex items-center justify-between text-xs font-medium text-slate-300">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] ${
              step >= 1
                ? "border-orange-400 bg-orange-500/20 text-orange-50"
                : "border-slate-600 bg-slate-900/40 text-slate-400"
            }`}
          >
            1
          </div>
          <span>Email</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] ${
              step >= 2
                ? "border-amber-400 bg-amber-500/20 text-amber-50"
                : "border-slate-600 bg-slate-900/40 text-slate-400"
            }`}
          >
            2
          </div>
          <span>OTP</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] ${
              step === 3
                ? "border-yellow-400 bg-yellow-500/20 text-yellow-50"
                : "border-slate-600 bg-slate-900/40 text-slate-400"
            }`}
          >
            3
          </div>
          <span>New password</span>
        </div>
      </div>
    </div>
  );
}
