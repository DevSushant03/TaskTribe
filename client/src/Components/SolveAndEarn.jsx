export default function SolveAndEarn() {
  const items = [
    {
      title: "UI/UX Design",
      desc: "Design intuitive interfaces, wireframes, and design systems for student projects and events.",
      img: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=60&auto=format",
    },
    {
      title: "Presentations",
      desc: "Create academic presentations, reports, and slides for classes and student groups.",
      img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=600&q=60&auto=format",
    },
    {
      title: "Editing",
      desc: "Review assignments, fix grammar, and improve clarity for academic writing.",
      img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=60&auto=format",
    },
    {
      title: "Software Development",
      desc: "Build and contribute to student-led web and mobile projects.",
      img: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=600&q=60&auto=format",
    },
    {
      title: "Research",
      desc: "Collect insights, validate ideas, and summarize findings for academic projects.",
      img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=60&auto=format",
    },
    {
      title: "Data Entry",
      desc: "Organize data, update spreadsheets, and keep academic records in order.",
      img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=60&auto=format",
    },
    {
      title: "Peer Support",
      desc: "Help fellow students, answer questions, and document solutions for common academic issues.",
      img: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=600&q=60&auto=format",
    },
    {
      title: "Coding",
      desc: "Solve coding challenges, debug assignments, and collaborate on student codebases.",
      img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=60&auto=format",
    },
    {
      title: "Content Writing",
      desc: "Write articles, microcopy, and descriptions for student clubs and academic events.",
      img: "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?w=600&q=60&auto=format",
    },
  ];

  return (
    <section id="Category" className="w-full py-20 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-3 text-center">
          How Can You <span className="text-orange-500">Collaborate?</span>
        </h2>

        <p className="text-gray-300 max-w-2xl mx-auto mb-14 text-center">
          Explore a variety of academic and project tasks — help peers, learn new skills, and build your student network.
        </p>

        <div className="columns-2 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="break-inside-avoid rounded-xl overflow-hidden border border-orange-600/40
                         bg-[#111] shadow-xl hover:shadow-orange-500/40
                         transition-all duration-300"
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                className="w-full object-cover"
              />

              <div className="p-4 backdrop-blur bg-black/40 flex flex-col gap-2 text-left">
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
