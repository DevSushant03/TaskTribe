import logo from "../../../assets/icon.jpeg";

export default function NotificationAvatar({ from }) {
  if (!from) {
    return (
      <img
        src={logo}
        alt="tasktribe"
        className="h-12 w-12 rounded-full object-cover border-2 border-orange-500/30"
      />
    );
  }

  if (from.photo) {
    return (
      <img
        src={from.photo}
        alt={`${from.name} ${from.surname}`}
        className="h-12 w-12 rounded-full object-cover border-2 border-orange-500/30"
      />
    );
  }

  return (
    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center border-2 border-orange-500/30">
      <span className="text-white font-semibold text-lg">
        {from?.name?.charAt(0)?.toUpperCase() || "T"}
      </span>
    </div>
  );
}