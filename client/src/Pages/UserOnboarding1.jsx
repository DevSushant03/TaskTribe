import React, { useState } from "react";

export default function UserOnboarding1({ onNext }) {
 
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
  onNext({
   
    photo
  });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-xl">
        <p className="text-sm text-gray-400 mb-2">Step 1 of 3</p>
        
        <h1 className="text-4xl font-bold mb-2">What's your name?</h1>
        <p className="text-gray-400 mb-6">
          Help your teammates recognize and connect with you more easily.
        </p>

        <div className="mb-8">
          <label className="block text-gray-300 mb-2 text-sm">Your profile photo (optional)</label>
          <label className="flex items-center gap-3 w-fit bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition">
            <span className="text-sm">Upload Photo</span>
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </label>

          {photo && (
            <img
              src={photo}
              alt="Preview"
              className="mt-4 w-20 h-20 rounded-full object-cover border border-gray-600"
            />
          )}
        </div>

        {/* Buttons */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white text-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}