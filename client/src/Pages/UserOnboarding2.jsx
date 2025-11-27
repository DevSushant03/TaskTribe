import React, { useState } from "react";
import { users } from "../utils/api";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

export default function UserOnboarding2({ onNext, onBack, userData }) {
  const Navigate = useNavigate(); 
  const [loading,setloading]=useState(false);
  const [photo, setPhoto] = useState(userData.photo || null);
  const [skills, setSkills] = useState([]);
  const [bio, setBio] = useState("");

  const skillList = [
    "Web Development",
    "App Development",
    "Content Writing",
    "Video Editing",
    "Graphic Design",
    "Data Entry",
    "Software Setup"
    
  ];
 

  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const handleSubmit = async () => {
    setloading(true)
    const response = await users.setUserData({photo, skills, bio });
    
    if (response.data.success) {
      Navigate(`/user/${response.data.userid}`)
    } else {
      setloading(false)
      toast.error(response.data?.message || "Unable to save profile");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gray-900 text-white flex justify-center">
      {/* LEFT SECTION */}
      <div className="p-12 flex flex-col justify-center">
        <p className="text-sm text-gray-400 mb-2">Step 2 of 2</p>

        <h1 className="text-3xl font-bold mb-2">✨ Your Skills & Story</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          Tell others what you can do and what makes you unique on TaskTribe.
        </p>

        {/* Skills Section */}
        <label className="block mb-3 text-gray-300 font-medium">
          Select your skills
        </label>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {skillList.map((skill) => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`p-3 rounded-lg text-sm border transition text-left ${
                skills.includes(skill)
                  ? "bg-blue-600 border-blue-700 text-white"
                  : "bg-gray-800 border-gray-700 text-gray-300"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>

        {/* Bio Input */}
        <label className="block mb-3 text-gray-300 font-medium">Your Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write a short intro about yourself..."
          className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-blue-400 resize-none"
        />

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={onBack}
            className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
          >
            Back
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {loading?"loading...":"Continue →"}
          </button>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="hidden md:block bg-gray-800 p-12 flex flex-col justify-center relative overflow-hidden">
        <h2 className="text-2xl font-semibold mb-4">
          Grow your skillset on TaskTribe
        </h2>

        <p className="text-gray-300 max-w-sm mb-8">
          Thousands of people are enhancing their careers, completing tasks, and
          earning more every day.
        </p>

        <div className="flex gap-4 mt-4">
          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=60"
            className="w-28 h-40 object-cover rounded-xl"
          />

          <img
            src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=200&q=60"
            className="w-28 h-40 object-cover rounded-xl"
          />

          <img
            src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=60"
            className="w-28 h-40 object-cover rounded-xl"
          />
        </div>

        <p className="text-gray-400 text-sm mt-6">
          63,271+ active members growing together ✨
        </p>
      </div>
    </div>
  );
}
