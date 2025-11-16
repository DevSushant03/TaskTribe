export default function SolveAndEarn() {
  const items = [
    { title: "Doubt Clearing", img: "/assets/doubt.jpg" },
    { title: "Projects", img: "/assets/projects.jpg" },
    { title: "Logs", img: "/assets/logs.jpg" },
    { title: "Research", img: "/assets/research.jpg" },
    { title: "Data Entry", img: "/assets/dataentry.jpg" },
    { title: "Editing", img: "/assets/editing.jpg" },
    { title: "Coding", img: "/assets/coding.jpg" },
    { title: "Software Support", img: "/assets/support.jpg" },
  ];

  return (
    <section className="w-full py-20 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-3">
          What Can You <span className="text-orange-500">Solve & Earn</span>
        </h2>

        {/* Subheading */}
        <p className="text-gray-300 max-w-2xl mx-auto mb-14">
          Explore a variety of tasks — complete work, earn rewards, and grow your skills.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="group rounded-xl overflow-hidden border border-orange-600/40 
                         bg-[#111] shadow-xl hover:shadow-orange-500/40 
                         transition-all duration-300 cursor-pointer"
            >
              {/* Background Image */}
              <div
                className="h-40 bg-cover bg-center group-hover:scale-110 
                           transition-transform duration-500"
                style={{ backgroundImage: `url(${item.img})` }}
              />

              {/* Text Section */}
              <div className="p-4 backdrop-blur bg-black/40">
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
