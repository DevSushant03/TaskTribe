import React, { useState } from "react";

export default function UserOnboarding1({ onNext }) {
  const [photo, setPhoto] = useState(null);
  const [bio, setBio] = useState("");
  const [bioError, setBioError] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = () => {
    if (!bio.trim()) {
      setBioError("Bio is required to showcase your expertise");
      return;
    }
    setBioError("");
    onNext({ photo, bio });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
      <p className="text-orange-400 text-lg font-medium mb-8 self-start">
        Step 1 of 2
      </p>

      {/* Main content - full width */}
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-16 items-center justify-center">
        {/* Left content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your Profile
          </h1>
          <p className="text-gray-400 text-xl mb-12 max-w-md">
            Add a photo and bio to get started on TaskTribe
          </p>
        </div>

        {/* Right form */}
        <div className="lg:w-1/2 w-full max-w-md">
          {/* Photo Upload */}
          <div className="mb-12">
            <label className="block text-orange-400 mb-4 font-semibold text-xl">
              Profile Photo (Optional)
            </label>
            <label className="flex items-center justify-center w-full h-32 bg-gray-900 border-2 border-dashed border-gray-600 rounded-2xl cursor-pointer hover:border-orange-500 hover:bg-gray-800 transition-colors p-4">
              <span className="text-gray-400 text-lg">
                {photo ? "✅ Photo selected" : "📸 Click to upload"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
            {photo && (
              <div className="mt-6 flex justify-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Preview"
                  className="w-28 h-28 rounded-full object-cover border-4 border-orange-500 ring-8 ring-orange-500/20 shadow-2xl"
                />
              </div>
            )}
          </div>

          {/* Bio Input */}
          <div className="mb-12">
            <label className="block text-orange-400 mb-4 font-semibold text-xl">
              Your Bio *{" "}
              {bioError && (
                <p className="text-red-400 text-base mt-3">{bioError}</p>
              )}
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell clients about your expertise, experience, and what makes you unique..."
              className="w-full h-40 bg-gray-900 border border-gray-600 rounded-2xl p-6 text-white text-lg focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 resize-none placeholder-gray-500"
            />

            <p className="text-sm text-gray-500 text-center lg:text-left">
              * Bio required to build client trust
            </p>
          </div>

          <div className="mb-16">
            <button
              onClick={handleSubmit}
              className="px-12 py-6 bg-orange-600 hover:bg-orange-700 text-white text-xl font-bold rounded-2xl border-2 border-orange-600 transition-all shadow-2xl hover:shadow-orange-500/25 hover:scale-[1.02] duration-200"
            >
              Continue to Skills →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-24"></div>
    </div>
  );
}
