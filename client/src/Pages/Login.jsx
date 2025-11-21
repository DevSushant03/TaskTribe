import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import SidePicture from "/src/assets/teamworks.jpg";
import { useState } from "react";
import { auth } from "../utils/api";
import { toast } from "react-toastify";
import {loginSchema} from "../Validation/auth_validation.js"
export default function Login() {
  const navigate = useNavigate();
  const [loading,setloading]=useState(false);
  const [error,seterror]=useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();
  
    // Validate before API call
    const validation = loginSchema.safeParse(formData);
  
    if (!validation.success) {
      setloading(false)
      const firstError = validation.error.issues[0].message;
      seterror(firstError);
      toast.error(firstError);
      return;
    }
  
    try {
      const { data } = await auth.login(formData);
  
      if (data.success) {
        setloading(false)
        if (data.user) {
          navigate("/dashboard");
        } else {
          navigate("/auth/createProfile");
        }
      } else {
        setloading(false)
        seterror(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      seterror(error.message);
    }
  };
  
  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-center px-8 py-8 bg-[#f0f8ff]">
          <div className="max-w-md mx-auto mt-10 w-full">
            <h2 className="text-center text-2xl font-semibold mb-6">Sign In</h2>

            {/* Social Login */}
            <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 mb-3 hover:bg-gray-100">
              <FcGoogle /> Continue with Google
            </button>
            <button className="w-full flex items-center justify-center bg-blue-600 text-white rounded-lg py-2 mb-4 hover:bg-blue-700">
              <FaFacebookF /> Continue with Facebook
            </button>

            {/* Divider */}
            <div className="flex items-center my-3">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 text-gray-500 font-bold">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email or Username"
                className="w-full mb-3 py-2 px-3 border border-gray-300 rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mb-3 py-2 px-3 border border-gray-300 rounded"
                required
              />
              {
                error && ( <p className="bg-red-100 border-1 border-solid p-2 my-2 rounded-sm text-red-500 text-sm">{error}</p>)
              }
              <div className="flex justify-between items-center mb-3 text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-1" />
                  Remember me
                </label>
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
              >
                {loading?"Loading..":"Log In"}
              </button>
            </form>

            {/* Signup link */}
            <p className="mt-5 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-blue-600">
                Sign Up
              </Link>
            </p>
            <p className="mt-10 text-center underline">
              <Link to="/"> {"< "}Back to home</Link>
            </p>
          </div>
        </div>
        {/* Right Visual Side */}
        <div className="h-screen flex-1 bg-gray-900 relative hidden md:flex overflow-hidden
 items-center justify-center">
          <img
            src={SidePicture}
            alt="Motivational Visual"
            loading="lazy"
            className="w-full object-cover object-center"
          />

          <p className="absolute bottom-12 right-16 text-white text-2xl font-script">
            make it real.
          </p>
        </div>
      </div>
    </>
  );
}
