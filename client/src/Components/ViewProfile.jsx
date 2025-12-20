import React from "react";
import { FaStar, FaEnvelope, FaUser, FaCalendarAlt, FaAward } from "react-icons/fa";

export default function ViewProfile({ UserProfile }) {
  const {
    photo,
    name,
    surname,
    email,
    bio,
    skills = [],
    rating = { avg: 0, count: 0 },
    review = [],
    role,
    createdAt,
  } = UserProfile || {};

  const renderStars = (ratingValue) => {
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar
            key={i}
            className="text-orange-500 fill-orange-500"
            size={14}
          />
        ))}
        {hasHalfStar && (
          <FaStar className="text-orange-500 fill-orange-500/50" size={14} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={i} className="text-gray-600" size={14} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full  bg-[#111] border border-orange-500/50 rounded-xl shadow-lg shadow-orange-500/10 overflow-hidden">
      {/* Header banner with gradient */}
      <div className="h-32 bg-gradient-to-r from-orange-600/20 via-orange-500/10 to-orange-600/20" />

      {/* Profile Header Section */}
      <div className="px-6 md:px-8 -mt-16 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          {/* Avatar */}
          <div className="relative">
            <img
              src={
                photo ||
                "https://ui-avatars.com/api/?background=0D1117&color=fff&name=" +
                  encodeURIComponent(`${name || ""} ${surname || ""}`)
              }
              alt={`${name} ${surname}`}
              className="h-28 w-28 rounded-full border-4 border-[#111] object-cover shadow-xl"
            />
            {role && (
              <div className="absolute -bottom-1 -right-1 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-[#111]">
                {role === "admin" ? "ADMIN" : "USER"}
              </div>
            )}
          </div>

          {/* Name and Basic Info */}
          <div className="flex-1 pb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {name || ""} {surname || ""}
            </h1>
            
            {/* Email */}
            <div className="flex items-center gap-2 text-gray-400 mb-3">
              <FaEnvelope size={14} className="text-orange-500" />
              <p className="text-sm break-all">{email || "No email provided"}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              {renderStars(rating?.avg || 0)}
              <span className="text-white font-semibold">
                {rating?.avg?.toFixed(1) || "0.0"}
              </span>
              <span className="text-gray-500 text-sm">
                ({rating?.count || 0} {rating?.count === 1 ? "review" : "reviews"})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="px-6 md:px-8 pb-6 md:pb-8 space-y-6">
        {/* About Section */}
        <section className="bg-[#0c0c0c] border border-gray-800 rounded-lg p-4 md:p-5">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <FaUser className="text-orange-500" size={16} />
            About
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {bio || "No bio added yet."}
          </p>
        </section>

        {/* Skills Section */}
        <section className="bg-[#0c0c0c] border border-gray-800 rounded-lg p-4 md:p-5">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <FaAward className="text-orange-500" size={16} />
            Skills
          </h2>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-full bg-orange-600/20 text-orange-400 text-sm font-medium border border-orange-500/50 hover:bg-orange-600/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">
              No skills added yet.
            </p>
          )}
        </section>

        {/* Latest Review Section */}
        {review && review.length > 0 && (
          <section className="bg-[#0c0c0c] border border-gray-800 rounded-lg p-4 md:p-5">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <FaStar className="text-orange-500" size={16} />
              Latest Review
            </h2>
            <div className="bg-[#111] border border-orange-500/30 rounded-lg p-4">
              <p className="text-gray-200 leading-relaxed mb-3">
                {review[review.length - 1].message}
              </p>
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <FaCalendarAlt size={12} />
                <span>
                  {new Date(
                    review[review.length - 1].createdAt
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Join Date */}
        {createdAt && (
          <div className="flex items-center gap-2 text-gray-500 text-sm pt-2 border-t border-gray-800">
            <FaCalendarAlt className="text-orange-500" size={14} />
            <span>
              Joined on{" "}
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
