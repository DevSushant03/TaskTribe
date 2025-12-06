import React from "react";
import profile1 from "../assets/infiniteScroll/profile1.jpg";
import profile2 from "../assets/infiniteScroll/profile2.jpg";
import profile3 from "../assets/infiniteScroll/profile3.jpg";
import profile4 from "../assets/infiniteScroll/profile4.jpg";
import profile5 from "../assets/infiniteScroll/profile5.jpg";
import profile6 from "../assets/infiniteScroll/profile6.jpg";
import profile7 from "../assets/infiniteScroll/profile7.jpg";

function InfiniteScroll() {
  const items = [
    {
      profile: "Full‑stack Developer",
      img: profile1,
      color: "from-sky-500/15 to-sky-500/5",
    },
    {
      profile: "Product Designer",
      img: profile2,
      color: "from-emerald-500/15 to-emerald-500/5",
    },
    {
      profile: "Data Engineer",
      img: profile3,
      color: "from-amber-500/15 to-amber-500/5",
    },
    {
      profile: "Project Manager",
      img: profile4,
      color: "from-purple-500/15 to-purple-500/5",
    },
    {
      profile: "QA Analyst",
      img: profile5,
      color: "from-rose-500/15 to-rose-500/5",
    },
    {
      profile: "DevOps Engineer",
      img: profile6,
      color: "from-cyan-500/15 to-cyan-500/5",
    },
    {
      profile: "UX Researcher",
      img: profile7,
      color: "from-indigo-500/15 to-indigo-500/5",
    },
  ];

  return (
    <div className="w-full overflow-hidden py-6">
      <div className="scroll-track flex items-center animate-scroll">
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className={`
          mx-6 h-[130px] min-w-[320px] max-w-[360px]
          rounded-full border border-black/10
          bg-gradient-to-r ${item.color}
          flex items-center gap-4 px-5
          shadow-[0_10px_30px_rgba(15,23,42,0.25)]
        `}
          >
            {/* left circle avatar */}
            <div className="flex h-[110px] w-[110px] items-center justify-center">
              <img
                src={item.img}
                alt={item.profile}
                className="h-[96px] w-[96px] rounded-full object-cover border-[3px] border-white/80 shadow-md"
              />
            </div>

            {/* right text waves */}
            <div className="flex flex-col justify-center gap-2 text-sm leading-snug text-white">
              <span className="font-semibold text-base">{item.profile}</span>
              <span className="h-[7px] w-32 rounded-full bg-white/60" />
              <span className="h-[7px] w-28 rounded-full bg-white/40" />
              <span className="h-[7px] w-24 rounded-full bg-white/30" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfiniteScroll;
