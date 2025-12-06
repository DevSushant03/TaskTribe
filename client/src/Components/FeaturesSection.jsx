export default function FeaturesSection() {
  const features = [
    {
      id: "01",
      title: "Post & Share",
      desc: "Create micro-tasks instantly, share with your tribe and collaborate faster.",
      img: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800",
    },
    {
      id: "02",
      title: "Real-Time Collaboration",
      desc: "Work together instantly, exchange ideas, and finish tasks with lightning speed.",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800",
    },
    {
      id: "03",
      title: "Earn Rewards",
      desc: "Help others, complete tasks, and earn points, badges and real-world rewards.",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: "04",
      title: "Build Network",
      desc: "Connect with talented contributors, expand your tribe, and grow your influence.",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="w-full py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center">
          Built For Contributors <br />
          <span className="text-orange-500">Loved By Tribe</span>
        </h2>

        <p className="text-gray-400 text-center max-w-2xl mx-auto mt-4 mb-20">
          TaskTribe empowers every user—students, freelancers, creators and
          helpers— to create micro-tasks and build real communities.
        </p>

        {/* Main container */}
        <div className="rounded-3xl p-10 md:p-16">
          {/* Feature Blocks */}
          <div className="space-y-20">
            {features.map((f, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-center gap-12
                  ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2">
                  <div
                    className="rounded-xl overflow-hidden shadow-xl
                                  hover:scale-[1.03] transition-all duration-300"
                  >
                    <img
                      src={f.img}
                      alt="feature"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2">
                  <p className="text-orange-500 font-bold mb-1 text-[40px]">
                    {f.id}
                  </p>
                  <h3 className="text-3xl font-semibold mb-3">{f.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-[15px]">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
