import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaArrowAltCircleLeft, FaEye, FaEyeSlash } from "react-icons/fa";

import SidePicture from "/src/assets/teamworks.jpg";
import { useState } from "react";
import { auth } from "../utils/api";
import { toast } from "react-toastify";
import { loginSchema } from "../Validation/auth_validation.js";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import CircularLoader from "../Components/CircularLoader.jsx";
import { ContextApi } from "../Context/ContextApi.jsx";
export default function Login() {
  const { setid } = useContext(ContextApi);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      setloading(false);
      const firstError = validation.error.issues[0].message;
      seterror(firstError);
      toast.error(firstError);
      return;
    }

    try {
      const { data } = await auth.login(formData);

      if (data.success) {
        setloading(false);
        if (data.user) {
          toast.success("Welcome Back");
          navigate(`/user/${data.userid}/dashboard`);
          setid(data.userid);
        } else {
          toast.success("Login Successfully");
          navigate("/auth/createProfile");
        }
      } else {
        setloading(false);
        seterror(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      seterror(error.message);
      setloading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | TaskTribe</title>
        <meta
          name="description"
          content="Login to TaskTribe and start posting or solving tasks quickly."
        />
      </Helmet>
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col h-screen justify-center px-8 py-8 bg-gradient-to-br from-orange-50 to-white">
          <button
            onClick={() => navigate("/")}
            className="absolute flex justify-evenly w-25 cursor-pointer top-5 left-5 text-white bg-orange-500  p-2 rounded-full "
          >
            <FaArrowAltCircleLeft color="white" size={25} /> Home
          </button>
          <div className="max-w-md mx-auto mt-10 w-full">
            {/* Social Login */}
            <button className="w-full flex items-center justify-center bg-white/70 backdrop-blur-sm border-2 border-orange-200/60 rounded-2xl py-3 mb-3 hover:shadow-neumorph-hover hover:border-orange-300/80 hover:bg-orange-50/80 transition-all duration-300 shadow-neumorph">
              <FcGoogle className="mr-2" /> Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center my-3">
              <div className="flex-grow border-t border-orange-200/60"></div>
              <span className="mx-2 text-gray-600 font-bold bg-white/90 px-3 py-1 rounded-full border border-orange-200/50 shadow-neumorph-sm">
                OR
              </span>
              <div className="flex-grow border-t border-orange-200/60"></div>
            </div>

            {/* Login Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-orange-200/50 shadow-neumorph-inset"
            >
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email or Username"
                className="w-full mb-3 py-3 px-4 bg-white/90 backdrop-blur-sm border-2 border-orange-200/70 rounded-xl placeholder-gray-500 focus:border-orange-400 focus:shadow-neumorph-focus focus:outline-none transition-all duration-300 shadow-neumorph-sm"
                required
              />
              <div className="relative mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full py-3 px-4 pr-12 bg-white/90 backdrop-blur-sm border-2 border-orange-200/70 rounded-xl placeholder-gray-500 focus:border-orange-400 focus:shadow-neumorph-focus focus:outline-none transition-all duration-300 shadow-neumorph-sm"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-600 hover:text-orange-700"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>

              {error && (
                <p className="bg-orange-50 border-2 border-orange-200/60 p-3 my-2 rounded-xl text-orange-700 text-sm shadow-neumorph-orange-sm backdrop-blur-sm">
                  {error}
                </p>
              )}
              <div className="flex justify-between items-center mb-4 text-sm text-gray-700">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2 w-4 h-4 border-2 border-orange-300 rounded focus:border-orange-500 focus:ring-orange-400 shadow-neumorph-checkbox"
                  />
                  Remember me
                </label>
                <a
                  href="/auth/forgot-password"
                  className="text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center align-center py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold hover:from-orange-600 hover:to-orange-700 border-2 border-orange-400/60 hover:shadow-neumorph-orange hover:border-orange-500/80  focus:shadow-neumorph-orange-focus transition-all duration-300 text-lg"
                disabled={loading}
              >
                {loading ? <CircularLoader /> : "Log In"}
              </button>
            </form>

            {/* Signup link */}
            <p className="mt-6 text-center text-sm text-gray-700 bg-white/70 backdrop-blur-sm px-4 py-3 rounded-2xl border border-orange-200/50 shadow-neumorph-sm">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="text-orange-600 font-semibold hover:text-orange-700 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Right Visual Side */}
        <div
          className="h-screen flex-1 bg-gray-900 relative hidden md:flex overflow-hidden
 items-center justify-center"
        >
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
