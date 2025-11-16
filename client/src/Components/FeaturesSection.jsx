export default function FeaturesSection() {
  const features = [
    {
      title: "Post & Share",
      desc: "Create micro-tasks instantly, share with your tribe, and find support from contributors around you.",
      icon: "📤",
    },
    {
      title: "Real-Time Collaboration",
      desc: "Work together instantly, exchange ideas, and complete tasks faster with live collaboration tools.",
      icon: "⚡",
    },
    {
      title: "Earn Rewards",
      desc: "Complete tasks, help others, and earn points, badges or real-world rewards.",
      icon: "🏆",
    },
    {
      title: "Build Network",
      desc: "Grow your circle with talented students, helpers, freelancers and passionate contributors.",
      icon: "🌐",
    },
  ];

  return (
    <section className="w-full py-20 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Built For Contributors<br />
          <span className="text-orange-500">Loved By Tribe</span>
        </h2>

        {/* Subheading */}
        <p className="text-gray-300 max-w-2xl mx-auto mb-14">
          TaskTribe empowers every user—students, freelancers and helpers—
          to create micro-tasks and build real communities.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-[#111] border border-orange-500/50 p-6 rounded-xl shadow-md 
                         hover:shadow-orange-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-4xl mb-3">{f.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
