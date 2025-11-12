import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tasks, stats } from '../utils/api';
import { getUser } from '../utils/auth';
import { Plus, Filter, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskList() {
  const navigate = useNavigate();
  const currentUser = getUser();
  const [activeTab, setActiveTab] = useState('available');
  const [availableTasks, setAvailableTasks] = useState([]);
  const [myPostedTasks, setMyPostedTasks] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [availableRes, postedRes, applicationsRes, statsRes] = await Promise.all([
        tasks.getAll(),
        tasks.getMyPosted(),
        tasks.getMyApplications(),
        stats.get(),
      ]);
      
      setAvailableTasks(availableRes.data);
      setMyPostedTasks(postedRes.data);
      setMyApplications(applicationsRes.data);
      setStatistics(statsRes.data);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTaskCard = (task, showActions = false) => (
    <div
      key={task.id}
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/user/${currentUser?.id}/task/${task.id}`)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(task.difficulty)}`}>
          {task.difficulty}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            By: {task.posterName || task.solverName || 'Unknown'}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
        <span className="text-sm text-blue-600 font-semibold">{task.category}</span>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <TrendingUp className="mb-2" size={32} />
          <p className="text-sm opacity-90">Total Posted</p>
          <p className="text-3xl font-bold">{statistics?.totalPosted || 0}</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <CheckCircle className="mb-2" size={32} />
          <p className="text-sm opacity-90">Completed</p>
          <p className="text-3xl font-bold">{statistics?.totalCompleted || 0}</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <Clock className="mb-2" size={32} />
          <p className="text-sm opacity-90">Active Tasks</p>
          <p className="text-3xl font-bold">{statistics?.activeTasks || 0}</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
          <AlertCircle className="mb-2" size={32} />
          <p className="text-sm opacity-90">Pending Apps</p>
          <p className="text-3xl font-bold">{statistics?.pendingApplications || 0}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('available')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === 'available'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Available Tasks
            </button>
            <button
              onClick={() => setActiveTab('posted')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === 'posted'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              My Posted Tasks
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === 'applications'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              My Applications
            </button>
          </div>

          <button
            onClick={() => navigate('post-task')}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <Plus size={20} />
            Post Task
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTab === 'available' && availableTasks.length === 0 && (
            <p className="text-gray-500 col-span-full text-center py-8">No available tasks</p>
          )}
          {activeTab === 'available' && availableTasks.map((task) => renderTaskCard(task))}

          {activeTab === 'posted' && myPostedTasks.length === 0 && (
            <p className="text-gray-500 col-span-full text-center py-8">You haven't posted any tasks yet</p>
          )}
          {activeTab === 'posted' && myPostedTasks.map((task) => renderTaskCard(task, true))}

          {activeTab === 'applications' && myApplications.length === 0 && (
            <p className="text-gray-500 col-span-full text-center py-8">You haven't applied to any tasks yet</p>
          )}
          {activeTab === 'applications' && myApplications.map((task) => renderTaskCard(task))}
        </div>
      </div>
    </div>
  );
}

export default TaskList;
