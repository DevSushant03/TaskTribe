import { useEffect, useState } from "react";
import socket from "../socket";
import { Helmet } from "react-helmet";
import { IoIosArrowBack } from "react-icons/io";
import { chatsApiRoutes } from "../utils/api";

function Chats() {
  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [myUserId, setMyUserId] = useState(null);
  const openChat = async (chat) => {
    setActiveChat(chat);
    
    setMessages([]);

    try {
      const res = await chatsApiRoutes.getMessages(chat.room._id);
      if (res.data.success) {
        // Remove duplicates based on _id before setting messages
        const uniqueMessages = res.data.messages.filter(
          (message, index, self) =>
            index ===
            self.findIndex((m) => m._id?.toString() === message._id?.toString())
        );
        setMessages(uniqueMessages);
        // Join socket room for real-time updates
        socket.emit("joinRoom", chat.room._id);
        // Reset unseen count for this chat
        setChats((prevChats) =>
          prevChats.map((c) =>
            c.room._id === chat.room._id ? { ...c, unseenCount: 0 } : c
          )
        );
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    socket.connect();

    return () => {
      // Leave all rooms before disconnecting
      if (activeChat?.room?._id) {
        socket.emit("leaveRoom", activeChat.room._id);
      }
      socket.disconnect();
    };
  }, []);

  // Leave previous room and join new room when activeChat changes
  useEffect(() => {
    if (activeChat?.room?._id) {
      socket.emit("joinRoom", activeChat.room._id);
    }
    return () => {
      if (activeChat?.room?._id) {
        socket.emit("leaveRoom", activeChat.room._id);
      }
    };
  }, [activeChat?.room?._id]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await chatsApiRoutes.getAllUsers();
        if (res.data.success) {
          setChats(res.data.chats);
          console.log(chats);

          setMyUserId(res.data.myId);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    const handler = (message) => {
      if (activeChat?.room?._id === message.chatRoomId) {
        setMessages((prev) => {
          // Check if message already exists to prevent duplicates
          const exists = prev.some(
            (m) => m._id?.toString() === message._id?.toString()
          );
          if (exists) return prev;
          return [...prev, message];
        });
        // If message is in active chat, don't increment unseen count
      }
      // Update chats list with new message
      // Handle both populated and non-populated senderId
      const messageSenderId =
        typeof message.senderId === "object" && message.senderId?._id
          ? message.senderId._id.toString()
          : message.senderId?.toString();
      const isMyMessage = messageSenderId === myUserId?.toString();

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.room._id === message.chatRoomId
            ? {
                ...chat,
                lastMessage: message,
                unseenCount:
                  activeChat?.room?._id === message.chatRoomId || isMyMessage
                    ? chat.unseenCount || 0
                    : (chat.unseenCount || 0) + 1,
              }
            : chat
        )
      );
    };

    socket.on("newMessage", handler);
    return () => socket.off("newMessage", handler);
  }, [activeChat?.room?._id, myUserId]);

  const sendMessage = async () => {
    if (!msg.trim() || !activeChat) return;

    try {
      const res = await chatsApiRoutes.sendMessage(activeChat.room._id, msg);
      if (res.data.success) {
        setMessages((prev) => {
          const exists = prev.some(
            (m) => m._id?.toString() === res.data.message._id?.toString()
          );
          if (exists) return prev;
          return [...prev, res.data.message];
        });
        // Update chats list with new message
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.room._id === activeChat.room._id
              ? { ...chat, lastMessage: res.data.message }
              : chat
          )
        );
        setMsg("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // if (chats) {
  //   return (
  //     <div className="flex-1 flex items-center justify-center bg-[#0C0C0C] min-h-screen">
  //       <div className="text-center">
  //         <p className="text-gray-400 text-sm">
  //           You don’t have any active chats yet. Assigned a task or apply to get
  //           started.
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <Helmet>
        <title>Chats | TaskTribe</title>
      </Helmet>

      <div className="flex h-screen w-screen bg-[#0c0c0c] text-gray-100">
        {/* LEFT PANEL — CHAT */}
        <section
          className={`${
            activeChat ? "block" : "hidden"
          } md:flex flex-col mt-15 md:mt-0 w-full  md:flex-1 relative bg-[#0c0c0c]`}
        >
          {/* Chat Top Bar */}
          <header className="px-5 py-5 border-b border-[#18181b] bg-[#0c0c0c]/95 backdrop-blur flex items-center justify-between">
            <div className="flex items-center gap-3 ">
              {activeChat &&
                (() => {
                  const otherUser = activeChat.room.participants.find(
                    (p) => p._id !== myUserId
                  );
                  return (
                    <>
                      <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                        <img src={otherUser?.photo} alt="profile" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold leading-tight">
                          {otherUser?.name + " " + otherUser?.surname ||
                            "Unknown User"}
                        </h3>
                        <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Online
                        </p>
                      </div>
                    </>
                  );
                })()}
            </div>

            <button
              onClick={() => setActiveChat(null)}
              className="md:hidden px-2 py-1 rounded-full hover:bg-[#11111a]"
            >
              <IoIosArrowBack size={30} />
            </button>
          </header>

          {/* Chat Messages */}
          <main className="flex-1 px-4 md:px-6 py-4 md:py-5 space-y-3 overflow-y-auto custom-scroll bg-gradient-to-b from-[#050507] to-[#050507]">
            {messages?.map((m, index) => {
              // Handle both populated (object) and non-populated (string/ObjectId) senderId
              const senderIdStr =
                typeof m.senderId === "object" && m.senderId?._id
                  ? m.senderId._id.toString()
                  : m.senderId?.toString();
              const isMyMessage = senderIdStr === myUserId?.toString();

              return (
                <div
                  key={m._id?.toString() || `${m.createdAt}-${index}`}
                  className={`flex ${
                    isMyMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[72%] rounded-2xl px-4 py-2.5 ${
                      isMyMessage
                        ? "bg-gradient-to-br from-orange-500 to-amber-600 text-black"
                        : "bg-[#0c0c0c] border border-[#1c1c27] text-gray-100"
                    }`}
                  >
                    <p className="text-sm break-words">{m.text}</p>
                    <span
                      className={`mt-1 block text-[10px] ${
                        isMyMessage ? "text-black/60" : "text-gray-500"
                      }`}
                    >
                      {new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </main>

          {/* Message Input (Floating Bar) */}
          <footer className="px-4 md:px-6 pb-4 pt-2 bg-gradient-to-t from-[#050507] via-[#050507]/80 to-transparent">
            <div className="flex items-center gap-2 bg-[#0c0c0c] border border-[#1c1c27] shadow-[0_0_0_1px_rgba(15,23,42,0.6)] px-3 md:px-4 py-2.5 md:py-3 rounded-2xl">
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-[#0c0c0c] hover:text-gray-300 text-lg">
                +
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent text-sm text-gray-100 placeholder:text-gray-500 outline-none"
              />
              <button
                onClick={sendMessage}
                className="bg-gradient-to-br from-orange-500 to-amber-600 text-black text-sm font-semibold px-4 md:px-5 py-1.5 rounded-full shadow-sm hover:brightness-110 active:scale-[0.98] transition"
              >
                Send
              </button>
            </div>
          </footer>
        </section>
        {/* //?------------RIGHT PANEL — USER LIST--------------------------  */}
        <aside
          className={` ${
            activeChat ? "hidden" : "block"
          } md:flex h-screen w-screen md:w-80 flex-col mt-15 md:mt-0 border-l border-[#18181b] bg-[#0c0c0c] `}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#18181b] bg-[#0c0c0c]">
            <h2 className="text-lg font-semibold tracking-tight">Messages</h2>
            <p className="text-xs text-gray-500 mt-1">
              All your TaskTribe conversations
            </p>
          </div>

          {/* Search */}
          <div className="px-4 py-3 border-b border-[#18181b]">
            <div className="flex items-center gap-2 bg-[#0c0c0c] border border-[#1f1f2b] rounded-full px-3 py-1.5">
              <input
                type="text"
                placeholder="Search"
                className="flex-1 bg-transparent text-xs text-gray-300 placeholder:text-gray-500 outline-none"
              />
            </div>
          </div>

          {/* User List */}
          <div className="overflow-y-auto custom-scroll flex-1">
            {chats?.map((chat) => {
              // get the OTHER user (not me)
              const otherUser = chat.room.participants.find(
                (p) => p._id !== myUserId
              );

              return (
                <button
                  key={chat.room._id}
                  onClick={() => openChat(chat)}
                  className={`w-full text-left px-4 py-3 flex gap-3 items-center transition-all duration-150 border-b border-[#0b0b11] hover:bg-[#0c0c0c]
        ${activeChat?.room?._id === chat.room._id ? "bg-[#0c0c0c]" : ""}
      `}
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden  flex items-center justify-center shadow-sm">
                    <img src={otherUser?.photo} alt="profile" />
                  </div>

                  {/* Name + last message */}
                  <div className="flex flex-col overflow-hidden flex-1">
                    <p className="font-medium text-sm truncate">
                      {otherUser?.name + " " + otherUser?.surname}
                    </p>

                    <p className="text-xs text-gray-500 truncate">
                      {chat.lastMessage?.text || "No messages yet"}
                    </p>
                  </div>

                  {/* Unseen badge */}
                  {chat.unseenCount > 0 && (
                    <span className="ml-auto min-w-[20px] h-[20px] px-1 text-xs rounded-full bg-orange-500 text-black flex items-center justify-center">
                      {chat.unseenCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </>
  );
}

export default Chats;
