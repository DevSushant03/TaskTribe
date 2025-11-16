import { Link } from "react-router-dom";
export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-white to-yellow-50 p-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 flex flex-col md:flex-row gap-8 items-center">
        {/* Left: Illustration + Funny Robot */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center">
          <div className="w-48 h-48 rounded-full bg-yellow-200 flex items-center justify-center shadow-inner mb-4 animate-pulse">
            <div className="text-6xl">🛠️🤖</div>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            Oops! We're building something epic 🚧
          </h1>
          <p className="text-gray-600 mb-4">
            TaskTribe is getting a glow-up. Soon you'll be matching with tasks
            like a pro.
          </p>

          <div className="bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-700 border border-gray-200">
            Current status:{" "}
            <span className="font-semibold text-orange-500">
              Nailing the UI ✨
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="p-4 rounded-lg border border-gray-100 bg-white">
            <p className="text-sm text-gray-600 mb-3">Meanwhile, try these:</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                Follow our{" "}
                <a className="text-orange-500 font-medium">Twitter</a> for
                updates
              </li>
              <li>
                Check out our{" "}
                <a className="text-orange-500 font-medium">Docs</a> (coming
                soon)
              </li>
              <li>
                Got feedback?{" "}
                <a className="text-orange-500 font-medium">Send us a message</a>
              </li>
            </ul>
          </div>

          <div className="mt-2 text-sm text-gray-500">
            If you must, try refreshing after a cup of coffee ☕ — we promise
            it'll be worth it.
          </div>

          <div className="mt-4 flex gap-3">
            <Link
              to="/"
              className="flex-1 px-4 py-3 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition"
            >
              Go to homepage
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom tiny footer */}
      <div className="absolute bottom-6 text-xs text-gray-400">
        Built with ❤️ by the TaskTribe crew — Under construction but having fun!
      </div>
    </div>
  );
}
