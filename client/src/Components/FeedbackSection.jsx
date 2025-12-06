export default function FeedbackSection() {
  const reviews = [
    {
      name: "Aman Verma",
      role: "B.Tech Student",
      date: "12 Nov 2025",
      category: "Projects",
      rating: 4,
      feedback:
        "TaskTribe helped me finish my college project fast. The helper responded in minutes!",
      color: "bg-[#FFE66D]", // yellow like left card
      rotate: "-rotate-3",
    },
    {
      name: "Sneha Patil",
      role: "Engineering Student",
      date: "5 Nov 2025",
      category: "Doubt Clearing",
      rating: 5,
      feedback:
        "Cleared my doubts instantly before my exam. Highly recommended!",
      color: "bg-[#A2D2FF]", // blue like center card
      rotate: "rotate-2",
    },
  ];

  return (
    <section className="w-full relative overflow-hidden py-24 text-white">
     
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Heading like reference */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-3">
          Real Voices & <span className="text-orange-400">Real Impact</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-300 text-center max-w-2xl mx-auto mb-10">
          Feedback from students and creators who use TaskTribe to solve
          projects, clear doubts, and grow their skills every day.
        </p>

        {/* SCROLLING ROW OF TILTED CARDS */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-center items-stretch mt-8">
          {reviews.map((item, i) => (
            <div
              key={i}
              className={`
                relative w-full md:w-1/3
                ${item.rotate}
                drop-shadow-2xl
              `}
            >
              <div
                className={`
                  ${item.color}
                  text-black rounded-3xl px-6 py-8
                  border border-black/10
                `}
              >
                {/* quote text */}
                <p className="text-base sm:text-lg leading-relaxed mb-6">
                  “{item.feedback}”
                </p>

                {/* meta bottom area */}
                <div className="mt-6 flex items-center justify-between text-xs sm:text-sm">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-black/70">
                      {item.role || item.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-black/60">{item.date}</p>
                    <p className="text-orange-600 font-semibold">
                      {"★".repeat(item.rating)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* optional third placeholder card like in screenshot */}
          <div className="hidden md:block rotate-3 drop-shadow-2xl w-1/3">
            <div className="bg-[#FFC1CC] text-black rounded-3xl px-6 py-8 border border-black/10">
              <p className="text-base leading-relaxed mb-6">
                “Fast, friendly help on my toughest assignments. TaskTribe makes
                group work and freelancing feel easy.”
              </p>
              <div className="mt-6 flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <p className="font-semibold">You could be next</p>
                  <p className="text-black/70">New TaskTribe member</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA bottom right-ish like reference */}
        <div className="flex justify-center md:justify-end mt-10">
          <button className="px-6 py-3 bg-orange-500 text-black font-semibold rounded-full shadow-lg hover:bg-orange-400 transition">
            Explore More Stories
          </button>
        </div>
      </div>
    </section>
  );
}
