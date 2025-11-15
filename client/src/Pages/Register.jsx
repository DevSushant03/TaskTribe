import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; // Optional for password visibility
import teamwork from "/src/assets/teamwork.jpg";
import friendsWorking from "/src/assets/friendsWorking.jpg";
export default function Register() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Signup Form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-8 bg-white">
        <div className="max-w-md mx-auto w-full mt-10">
          <h2 className="text-center text-2xl font-semibold mb-6">Sign up</h2>

          {/* Social Sign up */}
          <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 mb-3 hover:bg-gray-100">
            <FcGoogle className="h-5 w-5 mr-2" />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center bg-blue-600 text-white rounded-lg py-2 mb-4 hover:bg-blue-700">
            <FaFacebookF className="h-5 w-5 mr-2" />
            Continue with Facebook
          </button>

          {/* Divider */}
          <div className="flex items-center my-3">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500 font-bold">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Signup Form */}
          <form>
            <div className="flex space-x-3 mb-3">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 py-2 px-3 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 py-2 px-3 border border-gray-300 rounded"
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 py-2 px-3 border border-gray-300 rounded"
              required
            />
            <div className="relative mb-3">
              <input
                type="password"
                placeholder="Password"
                className="w-full py-2 px-3 border border-gray-300 rounded pr-10"
                required
              />
              {/* Optional: password toggle */}
              <FaRegEyeSlash className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
            <div className="flex items-center mb-3 text-sm">
              <input type="checkbox" className="mr-2" />
              <span>
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  User Agreement
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
                .
              </span>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
            >
              Join TaskTribe
            </button>
          </form>

          {/* Login link */}
          <p className="mt-5 text-center text-sm">
            Already have an account?
            <a href="/login" className="text-blue-600 hover:underline ml-1">
              Log in
            </a>
          </p>
          <p className="mt-10 text-center underline">
            <Link to="/"> {"< "}Back to home</Link>
          </p>
        </div>
      </div>
      {/* Right: Visual */}
      <div className="flex-1 h-screen bg-gray-900 relative hidden md:flex items-center justify-center overflow-hidden">
        <img
          src={teamwork} // Your image path
          alt="team-img"
          className="w-full h-full object-cover object-center rounded-none" // Key for responsive, fit behavior
        />
        <p className="absolute bottom-12 right-16 text-white text-2xl font-script">
          make it real.
        </p>
      </div>
    </div>
  );
}
