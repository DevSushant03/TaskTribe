import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="absolute w-full h-[100vh] overflow-hidden">

      
      <div className="relative z-10 max-w-5xl mx-auto px-6 h-full flex flex-col items-center justify-center mt-10 md:mt-0 text-center text-white">

        <h1 className="title text-3xl md:text-5xl leading-tight">
          Your Skill, Your Impact <br />
          <span className="text-orange-400">Growing Together on TaskTribe</span>
        </h1>

        <p className="mt-4 max-w-2xl text-gray-200 leading-relaxed">
          Freelance journey with transparent task launch and trusted build-your-profile
          system. Help others and earn — all in one.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10 mt-10 text-white font-semibold">
          <div className="text-center">
            <p className="text-3xl font-bold">200+</p>
            <p className="text-sm text-gray-300">Tasks Posted</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold">1k+</p>
            <p className="text-sm text-gray-300">Verified Users</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold">20k</p>
            <p className="text-sm text-gray-300">Messages</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold">₹240K</p>
            <p className="text-sm text-gray-300">Payments Made</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/auth"
            className="px-8 py-3 bg-orange-600 text-white rounded-lg text-lg font-medium hover:bg-orange-700 transition"
          >
            Launch Your Task
          </Link>

          <Link
            to="/auth"
            className="px-8 py-3 border border-orange-400 text-orange-300 rounded-lg text-lg font-medium hover:bg-orange-500/20 transition"
          >
            Explore Active Tasks
          </Link>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
