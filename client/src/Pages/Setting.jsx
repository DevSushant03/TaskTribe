import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/api";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

export default function Settings() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isLogout, setIsLogout] = useState(false);

  const [privacy, setPrivacy] = useState({
    directMessage: true,
    profileVisible: true,
    onlineStatus: true,
  });

  const handleLogOut = async () => {
    try {
      const res = await auth.logout();
      if (res.data.success) {
        toast.success(res.data.message);
        setIsLogout(false);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out");
    }
  };

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
          <InfoRow
            label="Full Name"
            value={
              user?.name && user?.surname
                ? `${user.name} ${user.surname}`
                : user?.name || "Not available"
            }
          />
          <InfoRow
            label="Email address"
            value={user?.email || "Not available"}
          />
          <InfoRow
            label="Account Created"
            value={
              user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                : "Not available"
            }
          />

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
        <Section title="Danger Zone" danger>
          <button
            onClick={() => setIsLogout(true)}
            className="px-4 py-2 mr-3 text-sm rounded-lg border border-red-600/50 text-red-500 hover:bg-red-600/10 transition"
          >
            Log out
          </button>
          <button className="px-4 py-2 text-sm rounded-lg border border-red-700/60 text-red-600 hover:bg-red-700/10 transition">
            Delete account
          </button>
        </Section>
      </div>

      {/* Logout Confirmation Modal */}
      <div
        className={`${isLogout ? "flex" : "hidden"
          } fixed inset-0 z-50 items-center justify-center bg-black/80`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
      >
        <div className="w-full max-w-sm rounded-lg bg-zinc-900 p-6 shadow-xl border border-zinc-800">
          <h2
            id="logout-title"
            className="text-lg font-semibold text-zinc-100 mb-2"
          >
            Log Out ?
          </h2>

          <p className="text-sm text-zinc-400 mb-6">
            Are you sure you want to logout from Task Tribe? This
            action cannot be undone.
          </p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsLogout(false)}
              className="px-4 py-2 text-sm rounded-md border border-zinc-600 text-zinc-200 hover:bg-zinc-800 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleLogOut}
              className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
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
        className={`relative w-11 h-6 rounded-full transition ${checked ? "bg-[#FF6B00]" : "bg-zinc-700"
          }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-black rounded-full transition ${checked ? "translate-x-5" : ""
            }`}
        />
      </button>
    </div>
  );
}
