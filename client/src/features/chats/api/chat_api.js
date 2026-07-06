import api from "../../../lib/axios"

export const chatsApiRoutes = {
  getAllUsers: () => api.get("/chats/getAllUsers"),
  getMessages: (chatRoomId) => api.get(`/chats/getMessage/${chatRoomId}`),
  sendMessage: (chatRoomId, text) =>
    api.post(`/chats/sendMessage/${chatRoomId}`, { text }),
  markMessageAsSeen: (chatRoomId) =>
    api.post(`/chats/markMessageAsSeen/${chatRoomId}`),
  markMessageAsUnseen: (chatRoomId) =>
    api.post(`/chats/markMessageAsUnseen/${chatRoomId}`),
  markMessageAsRead: (chatRoomId) =>
    api.post(`/chats/markMessageAsRead/${chatRoomId}`),
  markMessageAsUnread: (chatRoomId) =>
    api.post(`/chats/markMessageAsUnread/${chatRoomId}`),
  markMessageAsRead: (chatRoomId) =>
    api.post(`/chats/markMessageAsRead/${chatRoomId}`),
};
