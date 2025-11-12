import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tasks } from '../utils/api';
import { getUser } from '../utils/auth';
import { ArrowLeft, Calendar, Tag, TrendingUp, User, Star, Send, CheckCircle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const currentUser = getUser();
  
  const [task, setTask] = useState(null);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [applicationMessage, setApplicationMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [ratingComment, setRatingComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [showRatingModal, setShowRatingModal] = useState(false);

  useEffect(() => {
    fetchTaskDetails();
  }, [taskId]);

  const fetchTaskDetails = async () => {
    try {
      const taskRes = await tasks.getById(taskId);
      setTask(taskRes.data);

      if (taskRes.data.posterId === currentUser.id) {
        const appsRes = await tasks.getApplications(taskId);
        setApplications(appsRes.data);
      }

      if (taskRes.data.solverId === currentUser.id || taskRes.data.posterId === currentUser.id) {
        const messagesRes = await tasks.getMessages(taskId);
        setMessages(messagesRes.data);
      }
    } catch (error) {
      toast.error('Failed to load task details');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      await tasks.apply(taskId, applicationMessage);
      toast.success('Application submitted successfully!');
      setApplicationMessage('');
      fetchTaskDetails();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to apply');
    }
  };

  const handleApprove = async (appId) => {
    try {
      await tasks.approveApplication(appId);
      toast.success('Application approved!');
      fetchTaskDetails();
    } catch (error) {
      toast.error('Failed to approve application');
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      await tasks.sendMessage(taskId, newMessage);
      setNewMessage('');
      const messagesRes = await tasks.getMessages(taskId);
      setMessages(messagesRes.data);
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleComplete = async () => {
    try {
      await tasks.complete(taskId);
      toast.success('Task marked as complete!');
      setShowRatingModal(true);
      fetchTaskDetails();
    } catch (error) {
      toast.error('Failed to complete task');
    }
  };

  const handleRate = async () => {
    const ratedUserId = task.posterId === currentUser.id ? task.solverId : task.posterId;
    
    try {
      await tasks.rate(taskId, { rating, comment: ratingComment, ratedUserId });
      toast.success('Rating submitted!');
      setShowRatingModal(false);
      navigate(`/user/${currentUser.id}`);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to submit rating');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!task) {
    return <div className="p-6 text-center">Task not found</div>;
  }

  const isOwner = task.posterId === currentUser.id;
  const isSolver = task.solverId === currentUser.id;
  const canApply = !isOwner && task.status === 'open';
  const canMessage = isOwner || isSolver;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{task.title}</h1>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
            task.status === 'open' ? 'bg-blue-100 text-blue-800' :
            task.status === 'in-progress' ? 'bg-purple-100 text-purple-800' :
            'bg-green-100 text-green-800'
          }`}>
            {task.status}
          </span>
        </div>

        <div className="flex gap-6 mb-6 text-gray-600">
          <div className="flex items-center gap-2">
            <User size={18} />
            <span>Posted by: {task.posterName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag size={18} />
            <span>{task.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={18} />
            <span className="capitalize">{task.difficulty}</span>
          </div>
          {task.deadline && (
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{new Date(task.deadline).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{task.description}</p>
        </div>

        {task.solverName && (
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <p className="text-green-800">
              <strong>Solver:</strong> {task.solverName}
            </p>
          </div>
        )}

        {(isOwner || isSolver) && task.status === 'in-progress' && (
          <button
            onClick={handleComplete}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            <CheckCircle size={20} />
            Mark as Complete
          </button>
        )}
      </div>

      {canApply && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Apply for this Task</h2>
          <textarea
            value={applicationMessage}
            onChange={(e) => setApplicationMessage(e.target.value)}
            placeholder="Why are you a good fit for this task?"
            className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
          <button
            onClick={handleApply}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Application
          </button>
        </div>
      )}

      {isOwner && applications.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Applications</h2>
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{app.username}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star size={14} className="text-yellow-500" />
                      <span>{app.rating?.toFixed(1) || 'New'}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    app.status === 'approved' ? 'bg-green-100 text-green-800' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{app.message}</p>
                {app.status === 'pending' && (
                  <button
                    onClick={() => handleApprove(app.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {canMessage && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Messages</h2>
          <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 rounded-lg ${
                  msg.senderId === currentUser.id
                    ? 'bg-blue-100 ml-auto max-w-md'
                    : 'bg-gray-100 mr-auto max-w-md'
                }`}
              >
                <p className="font-semibold text-sm text-gray-600 mb-1">{msg.username}</p>
                <p className="text-gray-800">{msg.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Rate your experience</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setRating(value)}
                    className="p-2"
                  >
                    <Star
                      size={32}
                      className={rating >= value ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Comment</label>
              <textarea
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                placeholder="Share your feedback..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowRatingModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Skip
              </button>
              <button
                onClick={handleRate}
                className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskDetails;
