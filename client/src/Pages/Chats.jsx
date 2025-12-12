import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { IoIosArrowBack } from "react-icons/io";

const users = [
  {
    id: 1,
    name: "Client A",
    last: "Let’s start with the details.",
    avatar: "",
  },
  {
    id: 2,
    name: "Freelancer B",
    last: "I have submitted the files.",
    avatar: "",
  },
  { id: 3, name: "Client C", last: "Okay, checking…", avatar: "" },
  { id: 4, name: "Freelancer D", last: "Work done!", avatar: "" },
];

const messages = [
  { from: "them", text: "Hello! I need help with a task." },
  { from: "me", text: "Sure! Tell me the details." },
  { from: "them", text: "It's a UI design task for TaskTribe." },
  { from: "me", text: "Perfect! I can do it." },
  { from: "them", text: "Hello! I need help with a task." },
  { from: "me", text: "Sure! Tell me the details." },
  { from: "them", text: "It's a UI design task for TaskTribe." },
  { from: "me", text: "Perfect! I can do it." },
];

function Chats() {
  const [activeChat, setActiveChat] = useState(null);
  const [msg, setMsg] = useState("");

  const openChat = (id) => {
    setActiveChat(id);
  };
  return (
    <>
      <Helmet>
        <title>Chats | TaskTribe</title>
      </Helmet>

      <div className="flex h-screen w-screen bg-[#0c0c0c] text-gray-100 overflow-hidden">
        {/* RIGHT PANEL — CHAT */}
        <section
          className={`${
            activeChat ? "block" : "hidden"
          } md:flex flex-col mt-15 md:mt-0 w-full md:flex-1 relative bg-[#0c0c0c]`}
        >
          {/* Chat Top Bar */}
          <header className="px-5 py-5 border-b border-[#18181b] bg-[#0c0c0c]/95 backdrop-blur flex items-center justify-between">
            <div className="flex items-center gap-3 ">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-xs font-semibold text-black shadow-sm">
                CT
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-tight">
                  Client A
                </h3>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Online
                </p>
              </div>
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
            <div className="flex justify-center">
              <span className="text-[11px] text-gray-500 bg-[#0c0c0c] px-3 py-1 rounded-full">
                Today · 09:24 PM
              </span>
            </div>

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.from === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[72%] rounded-2xl px-3.5 py-2.5 text-xs md:text-sm shadow-sm ${
                    m.from === "me"
                      ? "bg-gradient-to-br from-orange-500 to-amber-600 text-black"
                      : "bg-[#0c0c0c] border border-[#1c1c27] text-gray-100"
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`mt-1 block text-[10px] ${
                      m.from === "me" ? "text-black/60" : "text-gray-500"
                    }`}
                  >
                    09:24 PM
                  </span>
                </div>
              </div>
            ))}
          </main>

          {/* Message Input (Floating Bar) */}
          <footer className="px-4 md:px-6 pb-4 pt-2 bg-gradient-to-t from-[#050507] via-[#050507]/80 to-transparent">
            <div className="flex items-center gap-2 bg-[#0c0c0c] border border-[#1c1c27] shadow-[0_0_0_1px_rgba(15,23,42,0.6)] px-3 md:px-4 py-2.5 md:py-3 rounded-2xl">
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-[#0c0c0c] hover:text-gray-300 text-sm">
                +
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-100 placeholder:text-gray-500 outline-none"
              />
              <button className="bg-gradient-to-br from-orange-500 to-amber-600 text-black text-sm font-semibold px-4 md:px-5 py-1.5 rounded-full shadow-sm hover:brightness-110 active:scale-[0.98] transition">
                Send
              </button>
            </div>
          </footer>
        </section>
        {/* LEFT PANEL — USER LIST */}
        <aside
          className={` ${
            activeChat ? "hidden" : "block"
          } md:flex w-80 flex-col mt-15 md:mt-0 border-l border-[#18181b] bg-[#0c0c0c] `}
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
            {users.map((u) => (
              <button
                key={u.id}
                onClick={() => openChat(u.id)}
                className={`w-full text-left px-4 py-3 flex gap-3 items-center transition-all duration-150 border-b border-[#0b0b11] hover:bg-[#0c0c0c] ${
                  activeChat === u.id ? "bg-[#0c0c0c]" : ""
                }`}
              >
                <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-xs font-semibold text-black shadow-sm">
                  {u.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <p className="font-medium text-sm truncate">{u.name}</p>
                  <p className="text-xs text-gray-500 truncate">{u.last}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>

      {/* Scrollbar Styling */}
      <style>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #f78c00ff;
          border-radius: 999px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </>
  );
}

export default Chats;
