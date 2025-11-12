import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '../utils/api';
import { Bell, CheckCircle, MessageSquare, UserCheck, Award } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Notification() {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await notifications.getAll();
      setNotifs(response.data);
    } catch (error) {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await notifications.markRead(id);
      fetchNotifications();
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'application':
        return <UserCheck className="text-blue-600" size={24} />;
      case 'approval':
        return <CheckCircle className="text-green-600" size={24} />;
      case 'message':
        return <MessageSquare className="text-purple-600" size={24} />;
      case 'completion':
        return <Award className="text-orange-600" size={24} />;
      default:
        return <Bell className="text-gray-600" size={24} />;
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
      
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Notifications</h1>

      {notifs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Bell className="text-gray-300 mx-auto mb-4" size={64} />
          <p className="text-gray-500 text-lg">No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifs.map((notif) => (
            <div
              key={notif.id}
              className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer ${
                !notif.isRead ? 'border-l-4 border-blue-600' : ''
              }`}
              onClick={() => {
                if (!notif.isRead) handleMarkRead(notif.id);
                if (notif.taskId) navigate(`/user/${notif.userId}/task/${notif.taskId}`);
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <p className={`text-gray-800 ${!notif.isRead ? 'font-semibold' : ''}`}>
                    {notif.message}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>
                {!notif.isRead && (
                  <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notification;
