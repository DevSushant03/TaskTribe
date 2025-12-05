export default function FeedbackSection() {
  const reviews = [
    {
      name: "Aman Verma",
      date: "12 Nov 2025",
      category: "Projects",
      rating: 4,
      feedback:
        "TaskTribe helped me finish my college project fast. The helper responded in minutes!",
      img: "/img/profile1.png",
    },
    {
      name: "Sneha Patil",
      date: "5 Nov 2025",
      category: "Doubt Clearing",
      rating: 5,
      feedback:
        "Cleared my doubts instantly before my exam. Highly recommended!",
      img: "/img/profile2.png",
    },
  ];

  return (
    <section className="w-full text-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center">
          Real Results From <span className="text-orange-500">Clients</span>
        </h2>

        <p className="text-gray-300 text-center max-w-2xl mx-auto mt-3 mb-12">
          Real feedback from students, freelancers, and project owners who use
          TaskTribe every day.
        </p>

    
        {/* REVIEWS GRID */}
        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((item, i) => (
            <div
              key={i}
              className="bg-[#111] border border-orange-500/40 rounded-xl p-6 shadow-md 
            hover:shadow-orange-500/40 transition-all duration-300"
            >
              {/* Profile */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
                  <img src={item.img} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-400 text-sm">{item.date}</p>
                </div>
              </div>

              {/* Category */}
              <p className="text-orange-500 font-semibold text-sm mb-2">
                {item.category}
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(item.rating)].map((_, idx) => (
                  <span key={idx} className="text-orange-500 text-xl">★</span>
                ))}
              </div>

              {/* Feedback */}
              <p className="text-gray-300 leading-relaxed">{item.feedback}</p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-12">
          <button className="px-6 py-3 bg-orange-500 text-black font-semibold rounded-xl hover:bg-orange-600 transition">
            Explore Now
          </button>
        </div>
      </div>
    </section>
  );
}
