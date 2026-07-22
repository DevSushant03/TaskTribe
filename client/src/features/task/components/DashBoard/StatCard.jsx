const StatCard = ({ label, value, icon }) => (
  <div className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-5 flex items-center gap-4 hover:border-orange-500/30 transition-colors duration-200">
    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-xs mb-0.5">{label}</p>
      <p className="text-2xl font-bold text-white">{value ?? 0}</p>
    </div>
  </div>
);

export default StatCard;