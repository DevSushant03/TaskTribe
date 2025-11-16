import { Link } from "react-router-dom";
export default function NotFound404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 text-center">
      {/* Funny Illustration */}
      <div className="w-52 h-52 bg-gray-200 rounded-full flex items-center justify-center shadow-inner mb-6 animate-bounce">
        <div className="text-7xl">😵‍💫</div>
      </div>

      <h1 className="text-5xl font-extrabold text-gray-800 mb-3">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-500 max-w-md mb-6">
        Looks like this page took a wrong turn somewhere... or maybe it's still
        under construction by our sleepy developers 😴.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="px-5 py-3 rounded-lg bg-orange-500 text-white font-semibold shadow hover:bg-orange-600 transition">
           <Link to="/">Back to home</Link>
        </button>
        <button className="px-5 py-3 rounded-lg bg-white border border-gray-300 font-semibold shadow hover:bg-gray-50 transition">
          Report Issue
        </button>
      </div>

      <p className="mt-6 text-xs text-gray-400">
        Maybe refresh after a cutting chai ☕. Works 50% of the time.
      </p>
    </div>
  );
}
