import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser, clearAuth } from "../utils/auth";
import { notifications } from "../utils/api";
import { BookOpen, Home, Bell, User, LogOut, Plus } from "lucide-react";

const UserLayout = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [notifs, setNotifs] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await notifications.getAll();
      setNotifs(response.data);
      setUnreadCount(response.data.filter(n => !n.isRead).length);
    } catch (error) {
      console.error('Failed to fetch notifications');
    }
  };

  const handleLogout = () => {
    clearAuth();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BookOpen className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-800">TaskTribe</h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/user/${user.id}`)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <Home size={20} />
                Dashboard
              </button>

              <button
                onClick={() => navigate(`/user/${user.id}/post-task`)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Plus size={20} />
                Post Task
              </button>

              <button
                onClick={() => navigate(`/user/${user.id}/notification`)}
                className="relative flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate(`/user/${user.id}/profile`)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <User size={20} />
                {user.username}
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
