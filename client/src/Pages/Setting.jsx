import React, { useState } from "react";

export default function Settings() {
  
  const [privacy, setPrivacy] = useState({
    directMessage: true,
    profileVisible: true,
    onlineStatus: true,
  });

  return (
    <div className="w-full min-h-full bg-[#050505] text-white px-4 py-6 md:py-8 flex justify-center overflow-x-hidden overflow-y-auto">
      <div className="w-full max-w-5xl mt-20 md:mt-0 space-y-6">

        {/* Header */}
        <header>
          <h1 className="text-2xl md:text-3xl font-semibold mb-1">
            Account <span className="text-[#FF6B00]">Settings</span>
          </h1>
          <p className="text-sm text-zinc-400 max-w-2xl">
            Manage privacy and security settings for your
            TaskTribe account.
          </p>
        </header>

        {/* Account Info */}
        <Section title="Account Information">
          <InfoRow label="Email address" value="sushant123@gmail.com" />
          <InfoRow label="User ID" value="6936cdb8d757096ac6f0ca90" />
        </Section>

       

        {/* Privacy */}
        <Section title="Privacy & Visibility">
          <Toggle
            label="Allow direct messages"
            description="Let other users contact you directly."
            checked={privacy.directMessage}
            onChange={() =>
              setPrivacy({
                ...privacy,
                directMessage: !privacy.directMessage,
              })
            }
          />
          <Toggle
            label="Profile visibility"
            description="Make your profile visible to other users."
            checked={privacy.profileVisible}
            onChange={() =>
              setPrivacy({
                ...privacy,
                profileVisible: !privacy.profileVisible,
              })
            }
          />
          <Toggle
            label="Online status"
            description="Show when you are online."
            checked={privacy.onlineStatus}
            onChange={() =>
              setPrivacy({
                ...privacy,
                onlineStatus: !privacy.onlineStatus,
              })
            }
          />
        </Section>

        {/* Security */}
        <Section title="Security">
          <button className="px-4 py-2 text-sm rounded-lg border border-zinc-700 hover:border-[#FF6B00] transition">
            Change password
          </button>
        </Section>

        {/* Danger Zone */}
        <Section title="Danger Zone"  danger>
          <button className="px-4 py-2 mr-3 text-sm rounded-lg border border-red-600/50 text-red-500 hover:bg-red-600/10 transition">
            Log out
          </button>
          <button className="px-4 py-2 text-sm rounded-lg border border-red-700/60 text-red-600 hover:bg-red-700/10 transition">
            Delete account
          </button>
        </Section>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function Section({ title, children, danger }) {
  return (
    <div className={`bg-[#151515] border ${danger ? "border-red-800/40" : "border-zinc-800/70"} rounded-xl p-6 space-y-4`}>
      <h2 className={`text-sm font-semibold uppercase tracking-wide ${danger ? "text-red-400" : "text-zinc-200"}`}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
      <span className="text-sm text-zinc-400">{label}</span>
      <span className="text-sm text-zinc-200 break-all">{value}</span>
    </div>
  );
}

function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="max-w-xl">
        <p className="text-sm text-zinc-200">{label}</p>
        <p className="text-[11px] text-zinc-500">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition ${
          checked ? "bg-[#FF6B00]" : "bg-zinc-700"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-black rounded-full transition ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}
