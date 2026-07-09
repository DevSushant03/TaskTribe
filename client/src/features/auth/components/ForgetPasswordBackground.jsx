import React from "react";

export default function ForgetPasswordBackground() {
  return (
    <>
      {/* animated orange gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-orange-500/30 blur-3xl" />
        <div className="absolute top-40 -right-20 h-80 w-80 rounded-full bg-amber-400/30 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-600/30 blur-3xl" />
      </div>

      {/* subtle grid + noise */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#ffffff10,_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,_#ffffff0f_1px,_transparent_1px),linear-gradient(to_bottom,_#ffffff0f_1px,_transparent_1px)] bg-[size:80px_80px]" />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-40"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />
    </>
  );
}
