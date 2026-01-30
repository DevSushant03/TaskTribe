import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <section className="absolute w-full h-[100vh] overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 h-full flex flex-col items-center justify-center mt-10 md:mt-0 text-center text-white">
        <h1 className="title text-3xl md:text-5xl leading-tight">
          Student Collaboration, Real Learning <br />
          <span className="text-orange-400">Connect & Grow on TaskTribe</span>
        </h1>

        <p className="mt-4 max-w-2xl text-gray-200 leading-relaxed">
          Join a campus-wide network to post academic tasks, help peers, clear doubts, and collaborate on projects. Build your student profile and learn together.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10 mt-10 text-white font-semibold">
          <div className="text-center">
            <p className="text-3xl font-bold">200+</p>
            <p className="text-sm text-gray-300">Academic Tasks Shared</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold">1k+</p>
            <p className="text-sm text-gray-300">Student Members</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold">20k</p>
            <p className="text-sm text-gray-300">Peer Messages</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold">50+</p>
            <p className="text-sm text-gray-300">Campuses Connected</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/auth"
            className="px-8 py-3 bg-orange-600 text-white rounded-lg text-lg font-medium hover:bg-orange-700 transition"
          >
            Post Academic Task
          </Link>

          <Link
            to="/auth"
            className="px-8 py-3 border border-orange-400 text-orange-300 rounded-lg text-lg font-medium hover:bg-orange-500/20 transition"
          >
            Browse Student Tasks
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
