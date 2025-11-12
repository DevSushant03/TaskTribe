import React, { useState, useEffect } from 'react';
import { users } from '../utils/api';
import { getUser } from '../utils/auth';
import { User, Star, CheckCircle, Award } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfilePage() {
  const currentUser = getUser();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    skills: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await users.getUser(currentUser.id);
      setProfile(response.data);
      setFormData({
        bio: response.data.bio || '',
        skills: response.data.skills || '',
      });
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await users.updateUser(currentUser.id, formData);
      toast.success('Profile updated successfully!');
      setEditing(false);
      fetchProfile();
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-24 h-24 rounded-full flex items-center justify-center">
              <User className="text-white" size={48} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{profile?.username}</h1>
              <p className="text-gray-600">{profile?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Star className="text-yellow-500" size={20} />
                <span className="font-semibold">{profile?.rating?.toFixed(1) || '0.0'}</span>
                <span className="text-gray-500">({profile?.completedTasks || 0} tasks)</span>
              </div>
            </div>
          </div>
          
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
            <CheckCircle className="text-green-600 mb-2" size={32} />
            <p className="text-sm text-gray-600">Completed Tasks</p>
            <p className="text-3xl font-bold text-gray-800">{profile?.completedTasks || 0}</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
            <Star className="text-blue-600 mb-2" size={32} />
            <p className="text-sm text-gray-600">Average Rating</p>
            <p className="text-3xl font-bold text-gray-800">{profile?.rating?.toFixed(1) || '0.0'}</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
            <Award className="text-purple-600 mb-2" size={32} />
            <p className="text-sm text-gray-600">Reputation</p>
            <p className="text-3xl font-bold text-gray-800">
              {profile?.rating >= 4.5 ? 'Excellent' : profile?.rating >= 3.5 ? 'Good' : 'New'}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Bio</label>
            {editing ? (
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-700 p-3 bg-gray-50 rounded-lg">
                {profile?.bio || 'No bio added yet'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Skills</label>
            {editing ? (
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Python, JavaScript, Data Analysis"
              />
            ) : (
              <p className="text-gray-700 p-3 bg-gray-50 rounded-lg">
                {profile?.skills || 'No skills added yet'}
              </p>
            )}
          </div>

          {editing && (
            <div className="flex gap-4">
              <button
                onClick={() => setEditing(false)}
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
