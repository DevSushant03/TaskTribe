import React, { useContext, useState } from "react";
import { users } from "../features/auth/api/auth_api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ContextApi } from "../Context/ContextApi";

export default function UserOnboarding2({ onBack, userData }) {
  const Navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [photo] = useState(userData.photo || null);
  const [bio] = useState(userData.bio || "");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    instagram: "",
    facebook: "",
    github: "",
    linkedin: "",
    portfolio: "",
  });

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const updateSocialLink = (platform, value) => {
    setSocialLinks((prev) => ({
      ...prev,
      [platform]: value,
    }));
  };
  const handleSubmit = async () => {
    setloading(true);
    const fd = new FormData();

    fd.append("skills", JSON.stringify(skills));
    fd.append("bio", bio || "");
    fd.append("socialLinks", JSON.stringify(socialLinks));

    if (photo) {
      fd.append("photo", photo);
    }

    try {
      const response = await users.setUserData(fd);
      if (response.data.success) {
        Navigate(`/user/${response.data.userid}/dashboard`);
        toast.success("Profile created successfully!");
      } else {
        toast.error(response.data?.message || "Unable to save profile");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-white">
      {/* Step indicator */}
      <div className="w-24 h-1 bg-orange-600 rounded-full mb-12 self-start"></div>
      <p className="text-orange-400 text-lg font-medium mb-12 self-start">
        Step 2 of 2
      </p>

      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-16 items-start">
        {/* Left content */}
        <div className="lg:w-1/2">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Build Client Trust
          </h1>
          <p className="text-gray-400 text-xl mb-16 max-w-lg">
            Add your skills and social proof. Complete profiles get 3x more
            invites.
          </p>
        </div>

        {/* Right form */}
        <div className="lg:w-1/2 w-full space-y-12">
          {/* Skills Input */}
          <div>
            <label className="block text-orange-400 mb-4 font-semibold text-xl">
              Your Skills (Optional)
            </label>
            <div className="flex flex-col md:flex-row   gap-3 mb-4 ">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="e.g. React Developer, Video Editor"
                className="flex-1 bg-gray-900 border border-gray-600 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-orange-500"
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
              />
              <button
                onClick={addSkill}
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl border-2 border-orange-600 transition-colors whitespace-nowrap"
              >
                Add Skill
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg flex items-center gap-2 hover:bg-orange-700 transition-colors cursor-pointer"
                  onClick={() => removeSkill(skill)}
                >
                  {skill}
                  <span className="text-xs">×</span>
                </div>
              ))}
            </div>
            {skills.length === 0 && (
              <p className="text-gray-500 text-sm mt-3 italic">
                Add 3-5 skills → Clients find you faster
              </p>
            )}
          </div>

          {/* Social Links */}
          <div>
            <label className="block text-orange-400 mb-6 font-semibold text-xl">
              Social Links (Optional)
            </label>
            <div className="space-y-4">
              {[
                {
                  key: "linkedin",
                  label: "LinkedIn",
                  placeholder: "linkedin.com/in/yourprofile",
                },
                {
                  key: "github",
                  label: "GitHub",
                  placeholder: "github.com/yourusername",
                },
                {
                  key: "portfolio",
                  label: "Portfolio",
                  placeholder: "yourportfolio.com",
                },
                {
                  key: "instagram",
                  label: "Instagram",
                  placeholder: "instagram.com/yourprofile",
                },
                {
                  key: "facebook",
                  label: "Facebook",
                  placeholder: "facebook.com/yourprofile",
                },
              ].map(({ key, label, placeholder }) => (
                <div
                  key={key}
                  className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-600 rounded-xl"
                >
                  <span className="text-orange-400 font-semibold min-w-[80px]">
                    {label}
                  </span>
                  <input
                    type="url"
                    placeholder={placeholder}
                    value={socialLinks[key]}
                    onChange={(e) => updateSocialLink(key, e.target.value)}
                    className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-lg border-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <button
              onClick={onBack}
              className="flex-1 px-8 py-4 bg-gray-900 text-gray-300 border border-gray-600 rounded-xl hover:bg-gray-800 transition font-semibold"
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl border-2 border-orange-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Creating Profile..." : "Launch Profile →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
