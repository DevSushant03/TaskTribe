import team_meating from "/src/assets/team_meating.jpg";

export default function AuthImage() {
  return (
    <div className="flex-1 h-screen bg-gray-900 relative hidden md:flex items-center justify-center overflow-hidden">
      <img
        src={team_meating}
        alt="team-img"
        loading="lazy"
        className="w-full h-full object-cover object-center rounded-none"
      />
    </div>
  );
}