import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, TrendingUp, Award } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-800">TaskTribe</h1>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Collaborate on Academic Tasks
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Connect with fellow students to post and solve academic tasks together
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition shadow-lg"
          >
            Join Now
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <Users className="text-blue-600 mb-4" size={48} />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Post Tasks</h3>
            <p className="text-gray-600">
              Share academic tasks or mini-projects you need help with
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <TrendingUp className="text-green-600 mb-4" size={48} />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Solve & Earn</h3>
            <p className="text-gray-600">
              Browse available tasks and apply your skills to help others
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <Award className="text-purple-600 mb-4" size={48} />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Build Reputation</h3>
            <p className="text-gray-600">
              Get rated and build your academic profile through quality work
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <p className="font-semibold text-gray-700">Create Account</p>
            </div>
            <div>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <p className="font-semibold text-gray-700">Post or Browse Tasks</p>
            </div>
            <div>
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <p className="font-semibold text-gray-700">Collaborate & Complete</p>
            </div>
            <div>
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <p className="font-semibold text-gray-700">Rate Each Other</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
