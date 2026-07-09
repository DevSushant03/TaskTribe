import React from "react";

export default function SecurityBadges() {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-black/60 px-3 py-1 backdrop-blur">
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-orange-500/20">
          <svg
            viewBox="0 0 24 24"
            className="h-3 w-3 text-orange-300"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M9.5 16.5 6 13l1.4-1.4 2.1 2.1 7.1-7.1L18 8l-8.5 8.5Z"
            />
          </svg>
        </span>
        <span>Bank‑grade TLS & salted hashing</span>
      </div>
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-black/60 px-3 py-1 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span>No password stored in plain text</span>
      </div>
    </div>
  );
}
