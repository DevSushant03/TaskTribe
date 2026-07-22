const MiniStatCard = ({ label, value }) => (
  <div className="bg-[#0C0C0C] border border-[#1A1A1A] rounded-xl p-3">
    <p className="text-gray-600 text-xs mb-1">{label}</p>
    <p className="text-xl font-bold text-white">{value ?? 0}</p>
  </div>
);

export default MiniStatCard;