import { useContext, useState } from "react";
import {
  FaEdit, FaEnvelope, FaStar, FaTrophy, FaCheckCircle,
  FaSpinner, FaTimes, FaCog, FaQuestionCircle,
  FaInstagram, FaFacebook, FaGithub, FaLinkedin, FaGlobe,
} from "react-icons/fa";
import { users } from "../../../features/auth/api/auth_api";
import { task } from "../../../features/task/api/task_api";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { ContextApi } from "../../../Context/ContextApi";

// ─── Constants ────────────────────────────────────────────────────────────────

const SOCIAL_CONFIG = [
  { key: "instagram", icon: FaInstagram, gradient: "from-pink-500 to-purple-500" },
  { key: "facebook",  icon: FaFacebook,  gradient: "from-blue-600 to-blue-700" },
  { key: "github",    icon: FaGithub,    gradient: "from-gray-700 to-gray-900" },
  { key: "linkedin",  icon: FaLinkedin,  gradient: "from-blue-700 to-blue-800" },
  { key: "portfolio", icon: FaGlobe,     gradient: "from-orange-500 to-orange-600" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getInitials = (name, surname) =>
  (name?.charAt(0) || "").toUpperCase() + (surname?.charAt(0) || "").toUpperCase() || "U";

const normalizeSkills = (skills) => {
  if (!skills) return [];
  if (Array.isArray(skills)) return skills.map((s) => String(s).trim()).filter(Boolean);
  if (typeof skills === "string") return skills.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
};

const hasContent = (val) =>
  val && (typeof val === "string" ? val.trim().length > 0 : true);

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-1">
      {[...Array(full)].map((_, i) => <FaStar key={`f${i}`} className="text-orange-500 fill-orange-500" size={15} />)}
      {half && <FaStar className="text-orange-500 fill-orange-500/50" size={15} />}
      {[...Array(empty)].map((_, i) => <FaStar key={`e${i}`} className="text-gray-600" size={15} />)}
      <span className="ml-1.5 text-gray-400 text-sm">({rating.toFixed(1)})</span>
    </div>
  );
}

function AvatarDisplay({ user, onEdit }) {
  return (
    <div className="relative inline-block">
      {user.photo ? (
        <img
          src={user.photo}
          alt={`${user.name} ${user.surname}`}
          className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-[#111] object-cover shadow-xl"
        />
      ) : (
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-[#111] bg-gradient-to-br from-orange-600 to-orange-400 flex items-center justify-center shadow-xl">
          <span className="text-3xl md:text-4xl font-bold text-white">
            {getInitials(user.name, user.surname)}
          </span>
        </div>
      )}
      <button
        onClick={onEdit}
        className="absolute bottom-1 right-1 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
      >
        <FaEdit size={12} />
      </button>
    </div>
  );
}

function AvatarEditor({ onSave, onCancel, saving }) {
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) { toast.warning("Please select an image file"); return; }
    if (f.size > 5 * 1024 * 1024) { toast.warning("File size must be under 5MB"); return; }
    setFile(f);
  };

  return (
    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-[#111] bg-[#1A1A1A] flex flex-col items-center justify-center shadow-xl gap-2 p-3">
      <input type="file" accept="image/*" onChange={handleFile} className="hidden" id="avatar-input" />
      <label htmlFor="avatar-input" className="cursor-pointer text-orange-400 text-xs text-center leading-tight hover:text-orange-300 transition-colors">
        {file ? file.name.slice(0, 12) + "…" : "Choose photo"}
      </label>
      <div className="flex gap-2">
        <button
          onClick={() => onSave(file)}
          disabled={saving || !file}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white p-1.5 rounded-full transition-all"
        >
          {saving ? <FaSpinner className="animate-spin" size={11} /> : <FaCheckCircle size={11} />}
        </button>
        <button
          onClick={onCancel}
          disabled={saving}
          className="bg-red-600/80 hover:bg-red-700 disabled:bg-gray-700 text-white p-1.5 rounded-full transition-all"
        >
          <FaTimes size={11} />
        </button>
      </div>
    </div>
  );
}

function EditForm({ bio, skills, socialLinks, onChange, onSocialChange }) {
  return (
    <div className="space-y-5 mt-4">
      {/* Bio */}
      <div>
        <label className="block text-gray-500 text-xs uppercase tracking-widest mb-2 font-medium">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => onChange("bio", e.target.value)}
          className="w-full bg-[#1A1A1A] border border-[#2a2a2a] focus:border-orange-500/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none resize-none transition-colors"
          rows={3}
          placeholder="Tell us about yourself..."
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block text-gray-500 text-xs uppercase tracking-widest mb-2 font-medium">Skills <span className="normal-case text-gray-600">(comma-separated)</span></label>
        <input
          type="text"
          value={skills}
          onChange={(e) => onChange("skills", e.target.value)}
          className="w-full bg-[#1A1A1A] border border-[#2a2a2a] focus:border-orange-500/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
          placeholder="e.g. JavaScript, React, Node.js"
        />
      </div>

      {/* Social Links */}
      <div>
        <label className="block text-gray-500 text-xs uppercase tracking-widest mb-3 font-medium">Social Links</label>
        <div className="space-y-2">
          {SOCIAL_CONFIG.map(({ key, icon: Icon }) => (
            <div key={key} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                <Icon className="text-orange-500" size={14} />
              </div>
              <input
                type="url"
                value={socialLinks[key] || ""}
                onChange={(e) => onSocialChange(key, e.target.value)}
                className="flex-1 bg-[#1A1A1A] border border-[#2a2a2a] focus:border-orange-500/60 rounded-xl px-3 py-2 text-white text-sm focus:outline-none transition-colors"
                placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} URL`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, children }) {
  return (
    <div className="bg-[#111] border border-[#1E1E1E] hover:border-orange-500/30 rounded-2xl p-5 transition-colors duration-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-orange-500/10 p-2.5 rounded-xl">
          <Icon className="text-orange-500" size={18} />
        </div>
        <div>
          <p className="text-gray-600 text-xs uppercase tracking-widest font-medium">{label}</p>
          <p className="text-white text-2xl font-bold leading-tight">{value}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function SocialLinks({ links }) {
  const activeLinks = SOCIAL_CONFIG.filter(({ key }) => hasContent(links?.[key]));
  if (activeLinks.length === 0) return null;

  return (
    <div className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-6 mb-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-orange-500/10 p-2.5 rounded-xl">
          <FaGlobe className="text-orange-500" size={16} />
        </div>
        <h3 className="text-white font-semibold text-base">Social Links</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {activeLinks.map(({ key, icon: Icon, gradient }) => {
          const href = links[key].startsWith("http") ? links[key] : `https://${links[key]}`;
          return (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 p-3 bg-[#161616] border border-[#1E1E1E] rounded-xl hover:border-orange-500/30 transition-all duration-150"
            >
              <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} group-hover:scale-105 transition-transform`}>
                <Icon className="text-white" size={15} />
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-medium capitalize">{key}</p>
                <p className="text-gray-600 text-xs truncate">{links[key].replace(/^https?:\/\//, "")}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function AccountSection({ userId, navigate }) {
  const items = [
    {
      icon: FaQuestionCircle,
      title: "Help & Support",
      desc: "Get assistance with your account or tasks",
      path: `/user/${userId}/help`,
    },
    {
      icon: FaCog,
      title: "Settings",
      desc: "Manage account preferences and privacy",
      path: `/user/${userId}/setting`,
    },
  ];

  return (
    <div className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-6 mb-5">
      <p className="text-xs text-gray-600 uppercase tracking-widest font-medium mb-4">Account & Support</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map(({ icon: Icon, title, desc, path }) => (
          <button
            key={title}
            onClick={() => navigate(path)}
            className="flex items-center gap-4 p-4 bg-[#161616] border border-[#1E1E1E] rounded-xl hover:border-orange-500/30 transition-all duration-150 group text-left"
          >
            <div className="bg-orange-500/10 p-2.5 rounded-xl group-hover:bg-orange-500/15 transition-colors flex-shrink-0">
              <Icon className="text-orange-500" size={17} />
            </div>
            <div>
              <p className="text-white text-sm font-medium mb-0.5">{title}</p>
              <p className="text-gray-600 text-xs">{desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function ProfilePage() {
  const { user, loading, setUser } = useContext(ContextApi);
  const { id } = useParams();
  const navigate = useNavigate();

  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingAvatar, setSavingAvatar] = useState(false);

  const [editBio, setEditBio] = useState("");
  const [editSkills, setEditSkills] = useState("");
  const [editSocialLinks, setEditSocialLinks] = useState({});

  // ── Edit handlers ──

  const openProfileEdit = () => {
    setEditBio(user.bio || "");
    setEditSkills(normalizeSkills(user.skills).join(", "));
    setEditSocialLinks({ ...user.socialLinks });
    setEditingProfile(true);
  };

  const cancelProfileEdit = () => {
    setEditingProfile(false);
    setEditBio(""); setEditSkills(""); setEditSocialLinks({});
  };

  const handleFieldChange = (field, value) => {
    if (field === "bio") setEditBio(value);
    if (field === "skills") setEditSkills(value);
  };

  const handleSocialChange = (key, value) =>
    setEditSocialLinks((prev) => ({ ...prev, [key]: value }));

  // ── Save profile ──

  const saveProfile = async () => {
    const userId = user?._id || id;
    if (!userId) { toast.error("User ID not found"); return; }
    setSavingProfile(true);
    try {
      const res = await users.editProfile(userId, {
        bio: editBio,
        skills: normalizeSkills(editSkills),
        socialLinks: editSocialLinks,
      });
      if (res.data.success) {
        setUser(res.data.user);
        cancelProfileEdit();
        toast.success("Profile updated!");
      } else {
        toast.error(res.data.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating profile");
    } finally {
      setSavingProfile(false);
    }
  };

  // ── Save avatar ──

  const saveAvatar = async (file) => {
    const userId = user?._id || id;
    if (!userId) { toast.error("User ID not found"); return; }
    if (!file) { toast.warning("Please select a file"); return; }
    setSavingAvatar(true);
    try {
      const formData = new FormData();
      formData.append("photo", file);
      const res = await users.changeProfilePic(userId, formData);
      if (res.data.success) {
        setUser(res.data.user);
        setEditingAvatar(false);
        toast.success("Profile picture updated!");
      } else {
        toast.error(res.data.message || "Failed to update picture");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating picture");
    } finally {
      setSavingAvatar(false);
    }
  };

  // ── Derived flags ──

  const skills = normalizeSkills(user?.skills);
  const hasSkills = skills.length > 0;
  const hasRating = (user?.rating?.avg || 0) > 0;
  const hasSocialLinks = user?.socialLinks &&
    Object.values(user.socialLinks).some((v) => hasContent(v));

  // ── Guards ──

  if (loading) return (
    <div className="flex-1 flex items-center justify-center bg-[#0C0C0C] min-h-screen">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </div>
    </div>
  );

  if (!user) return (
    <div className="flex-1 flex items-center justify-center bg-[#0C0C0C] min-h-screen">
      <p className="text-gray-500 text-sm">No profile data found.</p>
    </div>
  );

  return (
    <div className="flex-1 bg-[#0C0C0C] min-h-screen overflow-y-auto">
      <Helmet>
        <title>Profile | TaskTribe</title>
        <meta name="description" content="View and edit your TaskTribe profile." />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-10">

        {/* ── Profile Header ── */}
        <div className="bg-[#111] border border-[#1E1E1E] rounded-2xl overflow-hidden mb-5">

          {/* Banner */}
          <div className="h-28 md:h-36 bg-gradient-to-r from-orange-600/20 via-orange-500/10 to-transparent relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMTAwLDUwLC4wOCkiLz48L3N2Zz4=')] opacity-40" />
          </div>

          <div className="px-6 md:px-8 pb-7 -mt-14 md:-mt-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

              {/* Avatar */}
              {editingAvatar ? (
                <AvatarEditor
                  onSave={saveAvatar}
                  onCancel={() => setEditingAvatar(false)}
                  saving={savingAvatar}
                />
              ) : (
                <AvatarDisplay user={user} onEdit={() => setEditingAvatar(true)} />
              )}

              {/* Edit / Save buttons */}
              <div className="flex gap-2 pb-1">
                {editingProfile ? (
                  <>
                    <button
                      onClick={saveProfile}
                      disabled={savingProfile}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                    >
                      {savingProfile
                        ? <><FaSpinner className="animate-spin" size={13} /> Saving…</>
                        : <><FaCheckCircle size={13} /> Save</>}
                    </button>
                    <button
                      onClick={cancelProfileEdit}
                      disabled={savingProfile}
                      className="flex items-center gap-2 bg-[#1E1E1E] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-gray-400 hover:text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                    >
                      <FaTimes size={13} /> Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={openProfileEdit}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                  >
                    <FaEdit size={13} /> Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Name + bio */}
            <div className="mt-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                {user.name} {user.surname}
              </h1>

              {editingProfile ? (
                <EditForm
                  bio={editBio}
                  skills={editSkills}
                  socialLinks={editSocialLinks}
                  onChange={handleFieldChange}
                  onSocialChange={handleSocialChange}
                />
              ) : (
                <p className={`text-sm leading-relaxed max-w-2xl ${user.bio ? "text-gray-400" : "text-gray-600 italic"}`}>
                  {user.bio || "No bio yet — click Edit Profile to add one."}
                </p>
              )}

              {/* Email */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#1E1E1E]">
                <FaEnvelope className="text-orange-500" size={13} />
                <span className="text-gray-400 text-sm">{user.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        {(hasRating || hasSkills) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {hasRating && (
              <StatCard icon={FaTrophy} label="Rating" value={user.rating.avg.toFixed(1)}>
                <StarRating rating={user.rating.avg} />
                <p className="text-gray-600 text-xs mt-1">
                  {user.rating?.count || 0} {user.rating?.count === 1 ? "review" : "reviews"}
                </p>
              </StatCard>
            )}
            {hasSkills && (
              <StatCard icon={FaCheckCircle} label="Skills" value={skills.length}>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span key={i} className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2.5 py-1 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </StatCard>
            )}
          </div>
        )}

        {/* ── Social Links ── */}
        {hasSocialLinks && !editingProfile && (
          <SocialLinks links={user.socialLinks} />
        )}

        {/* ── Account & Support ── */}
        <AccountSection userId={id} navigate={navigate} />

      </div>
    </div>
  );
}

export default ProfilePage;