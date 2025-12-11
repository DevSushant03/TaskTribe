import { useContext } from "react";
import {
  FaEdit,
  FaEnvelope,
  FaStar,
  FaTrophy,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import { auth } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Context/AuthContext";

function ProfilePage() {
  const { user, loading } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    const res = await auth.logout();
    if (res.data.success) {
      alert(res.data.message);
      navigate("/");
    } else {
      alert(res.data.message);
    }
  };

  const getInitials = (name, surname) => {
    const first = name?.charAt(0).toUpperCase() || "";
    const last = surname?.charAt(0).toUpperCase() || "";
    return first + last || "U";
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar
            key={i}
            className="text-orange-500 fill-orange-500"
            size={16}
          />
        ))}
        {hasHalfStar && (
          <FaStar className="text-orange-500 fill-orange-500/50" size={16} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={i} className="text-gray-400" size={16} />
        ))}
        <span className="ml-2 text-gray-300 text-sm">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0C0C0C] min-h-screen">
        <div className="text-center">
          <FaSpinner
            className="animate-spin text-orange-600 mx-auto mb-4"
            size={40}
          />
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0C0C0C] min-h-screen">
        <div className="text-center">
          <p className="text-gray-400">No profile data found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#0C0C0C] min-h-screen overflow-y-auto">
      <Helmet>
        <title>Profile | TaskTribe</title>
        <meta
          name="description"
          content="View and edit your TaskTribe profile. Update your bio, skills, photo, and personal details to improve your visibility and build trust."
        />
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Profile Header Card */}
        <div className="bg-[#111] border border-orange-500/50 rounded-2xl shadow-lg shadow-orange-500/10 mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600/20 to-orange-500/10 h-32 md:h-40"></div>

          <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-16 md:-mt-20">
            {/* Profile Picture */}
            <div className="relative inline-block">
              {user.photo ? (
                <img
                  src={user.photo}
                  alt={`${user.name || ""} ${user.surname || ""}`}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#111] object-cover shadow-xl"
                />
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#111] bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center shadow-xl">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {getInitials(user.name, user.surname)}
                  </span>
                </div>
              )}
              <button className="absolute bottom-2 right-2 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110">
                <FaEdit size={14} />
              </button>
            </div>

            {/* User Info */}
            <div className="mt-4 md:mt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {user.name || ""} {user.surname || ""}
                  </h1>
                  {user.bio && (
                    <p className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed">
                      {user.bio}
                    </p>
                  )}
                  {!user.bio && (
                    <p className="text-gray-500 italic">No bio available</p>
                  )}
                </div>

                <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/50 self-start">
                  <FaEdit />
                  <span>Edit Profile</span>
                </button>
              </div>

              {/* Email & Role */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-4 pt-4 border-t border-gray-800">
                <div className="flex items-center gap-2 text-gray-300">
                  <FaEnvelope className="text-orange-500" />
                  <span className="text-sm md:text-base">{user.email}</span>
                </div>
                {/* <div className="flex items-center gap-2">
                  {user.role === "admin" ? (
                    <span className="flex items-center gap-1 bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-xs md:text-sm font-medium border border-purple-500/50">
                      <FaCheckCircle />
                      Admin
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs md:text-sm font-medium border border-blue-500/50">
                      <FaCheckCircle />
                      Member
                    </span>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Rating Card */}
          <div className="bg-[#111] border border-orange-500/50 rounded-xl p-6 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-600/20 p-3 rounded-lg">
                <FaTrophy className="text-orange-500" size={24} />
              </div>
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Rating</h3>
                <p className="text-white text-2xl font-bold">
                  {user.rating?.avg > 0 ? user.rating.avg.toFixed(1) : "0.0"}
                </p>
              </div>
            </div>
            {user.rating?.avg > 0 ? (
              <div className="space-y-2">
                {renderStars(user.rating.avg)}
                <p className="text-gray-500 text-sm">
                  Based on {user.rating?.count || 0}{" "}
                  {user.rating?.count === 1 ? "review" : "reviews"}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No ratings yet</p>
            )}
          </div>

          {/* Skills Card */}
          <div className="bg-[#111] border border-orange-500/50 rounded-xl p-6 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-600/20 p-3 rounded-lg">
                <FaCheckCircle className="text-orange-500" size={24} />
              </div>
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Skills</h3>
                <p className="text-white text-2xl font-bold">
                  {user.skills?.length || 0}
                </p>
              </div>
            </div>
            {user.skills && user.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-4">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-orange-600/20 text-orange-400 px-3 py-1 rounded-full text-sm font-medium border border-orange-500/50 hover:bg-orange-600/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm mt-4">No skills added yet</p>
            )}
          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-[#111] border border-orange-500/50 rounded-xl p-6 md:p-8 shadow-lg shadow-orange-500/10">
          <h2 className="text-2xl font-bold text-white mb-6">
            Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-gray-400 text-sm font-medium">Full Name</p>
              <p className="text-white text-lg">
                {user.name || "Not set"} {user.surname || ""}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400 text-sm font-medium">Email Address</p>
              <p className="text-white text-lg">{user.email}</p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400 text-sm font-medium">Member Since</p>
              <p className="text-white text-lg">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>

            {/* <div className="space-y-1">
              <p className="text-gray-400 text-sm font-medium">Account Type</p>
              <p className="text-white text-lg capitalize">
                {user.role || "user"}
              </p>
            </div> */}
          </div>
        </div>
        {/* Account Controll */}
        <div>
          <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4">
            <button
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 flex items-center gap-2 shadow"
              onClick={handleLogOut}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                />
              </svg>
              Log Out
            </button>
            <span className="text-gray-500 text-sm">
              Manage your account securely.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
