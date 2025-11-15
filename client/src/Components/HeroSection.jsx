import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="absolute w-full h-[100vh] overflow-hidden">

      {/* Background Video */}
      {/* <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video> */}

      {/* Overlay for better text visibility */}
      {/* <div className="absolute inset-0 bg-black/40"></div> */}

      {/* Hero Text Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 h-full flex flex-col items-center justify-center text-center text-white">

        <h1 className="title text-4xl md:text-5xl leading-tight">
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
            <p className="text-3xl font-bold">325</p>
            <p className="text-sm text-gray-300">Tasks Posted</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold">8500</p>
            <p className="text-sm text-gray-300">Verified Users</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold">50,000+</p>
            <p className="text-sm text-gray-300">Messages</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold">₹2.1 Lakh</p>
            <p className="text-sm text-gray-300">Payments Made</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/post-task"
            className="px-8 py-3 bg-orange-600 text-white rounded-lg text-lg font-medium hover:bg-orange-700 transition"
          >
            Launch Your Task
          </Link>

          <Link
            to="/tasks"
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
