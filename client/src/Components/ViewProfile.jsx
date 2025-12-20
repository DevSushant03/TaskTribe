import React from "react";

export default function ViewProfile({ UserProfile }) {
  console.log(UserProfile);
  
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

  return (
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Header banner */}
        <div className="h-28 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800" />

        {/* Avatar + name */}
        <div className="px-6 -mt-12 flex flex-col sm:flex-row sm:items-end gap-4">
          <img
            src={
              photo ||
              "https://ui-avatars.com/api/?background=0D1117&color=fff&name=" +
                encodeURIComponent(`${name || ""} ${surname || ""}`)
            }
            alt={name}
            className="h-24 w-24 rounded-full border-4 border-zinc-900 object-cover"
          />
          <div className="flex-1 pb-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold text-zinc-50">
                {name} {surname}
              </h1>
              {role && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300">
                  {role === "admin" ? "Admin" : "User"}
                </span>
              )}
            </div>
            <p className="text-sm text-zinc-400 break-all">{email}</p>
            <div className="mt-2 flex items-center gap-2 text-sm text-zinc-300">
              <span className="font-medium">
                {rating?.avg?.toFixed(1) || "0.0"}
              </span>
              <span className="text-yellow-400">★</span>
              <span className="text-zinc-500">
                ({rating?.count || 0} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 pt-4 space-y-4">
          {/* Bio */}
          <section>
            <h2 className="text-sm font-semibold text-zinc-300 mb-1">
              About
            </h2>
            <p className="text-sm text-zinc-400">
              {bio || "No bio added yet."}
            </p>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-sm font-semibold text-zinc-300 mb-1">
              Skills
            </h2>
            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-xs text-zinc-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-500">
                No skills added yet.
              </p>
            )}
          </section>

          {/* Recent review */}
          {review && review.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-zinc-300 mb-1">
                Latest Review
              </h2>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2">
                <p className="text-sm text-zinc-200 line-clamp-3">
                  {review[review.length - 1].message}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {new Date(
                    review[review.length - 1].createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </section>
          )}

          {/* Meta */}
          {createdAt && (
            <p className="text-xs text-zinc-500">
              Joined on{" "}
              {new Date(createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
  );
}
