import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import team_meating from "/src/assets/team_meating.jpg";
import { auth } from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../Validation/auth_validation.js";
import { Helmet } from "react-helmet";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setloading(true);
    try {
      const response = await auth.register(data);

      if (response.data.success) {
        setloading(false);
        navigate("/auth");
      } else {
        setloading(false);
        seterror(response.data.message);
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      setloading(false);
      toast.error(error.message || "Registration failed");
      seterror(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Account | TaskTribe</title>
        <meta
          name="description"
          content="Join TaskTribe to post tasks or earn money by solving tasks. Free to sign up."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-center px-8 py-8 min-h-screen bg-gradient-to-br from-orange-50 to-white">
          <div className="max-w-md mx-auto w-full mt-10">
            {/* Social Login */}
            <button className="w-full flex items-center justify-center bg-white/70 backdrop-blur-sm border-2 border-orange-200/60 rounded-2xl py-3 mb-3 hover:shadow-neumorph-hover hover:border-orange-300/80 hover:bg-orange-50/80 transition-all duration-300 shadow-neumorph h-5 w-5">
              <FcGoogle className="h-5 w-5 mr-2" /> Continue with Google
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
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-orange-200/50 shadow-neumorph-inset"
            >
              <div className="flex space-x-3 mb-4">
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="First Name"
                    {...register("name")}
                    className="w-full py-3 px-4 bg-white/90 backdrop-blur-sm border-2 border-orange-200/70 rounded-xl placeholder-gray-500 focus:border-orange-400 focus:shadow-neumorph-focus focus:outline-none transition-all duration-300 shadow-neumorph-sm"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1 font-medium bg-orange-50/80 border border-orange-200/60 px-2 py-1 rounded-lg shadow-neumorph-orange-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...register("surname")}
                    className="w-full py-3 px-4 bg-white/90 backdrop-blur-sm border-2 border-orange-200/70 rounded-xl placeholder-gray-500 focus:border-orange-400 focus:shadow-neumorph-focus focus:outline-none transition-all duration-300 shadow-neumorph-sm"
                  />
                  {errors.surname && (
                    <p className="text-red-600 text-sm mt-1 font-medium bg-orange-50/80 border border-orange-200/60 px-2 py-1 rounded-lg shadow-neumorph-orange-sm">
                      {errors.surname.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="w-full py-3 px-4 bg-white/90 backdrop-blur-sm border-2 border-orange-200/70 rounded-xl placeholder-gray-500 focus:border-orange-400 focus:shadow-neumorph-focus focus:outline-none transition-all duration-300 shadow-neumorph-sm"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1 font-medium bg-orange-50/80 border border-orange-200/60 px-2 py-1 rounded-lg shadow-neumorph-orange-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  className="w-full py-3 px-4 bg-white/90 backdrop-blur-sm border-2 border-orange-200/70 rounded-xl placeholder-gray-500 focus:border-orange-400 focus:shadow-neumorph-focus focus:outline-none transition-all duration-300 shadow-neumorph-sm pr-10"
                />
                <FaRegEyeSlash className="absolute right-4 top-4 text-gray-400 h-5 w-5" />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1 font-medium bg-orange-50/80 border border-orange-200/60 px-2 py-1 rounded-lg shadow-neumorph-orange-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {error && (
                <p className="bg-red-50 border-2 border-orange-200/60 p-3 my-2 rounded-xl text-orange-700 text-sm shadow-neumorph-orange-sm backdrop-blur-sm">
                  {error}
                </p>
              )}

              <div className="flex items-center mb-4 text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4 border-2 border-orange-300 rounded focus:border-orange-500 focus:ring-orange-400 shadow-neumorph-checkbox"
                />
                <span className="text-gray-600">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors"
                  >
                    User Agreement
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold hover:from-orange-600 hover:to-orange-700 border-2 border-orange-400/60 hover:shadow-neumorph-orange hover:border-orange-500/80  focus:shadow-neumorph-orange-focus transition-all duration-300 text-lg"
                disabled={loading}
              >
                {loading ? "loading..." : "Join TaskTribe"}
              </button>
            </form>

            {/* Login link */}
            <p className="mt-6 text-center text-sm text-gray-700 bg-white/70 backdrop-blur-sm px-4 py-3 rounded-2xl border border-orange-200/50 shadow-neumorph-sm">
              Already have an account?{" "}
              <Link
                to="/auth"
                className="text-orange-600 font-semibold hover:text-orange-700 transition-colors"
              >
                Sign In
              </Link>
            </p>

           
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 h-screen bg-gray-900 relative hidden md:flex items-center justify-center overflow-hidden">
          <img
            src={team_meating}
            alt="team-img"
            loading="lazy"
            className="w-full h-full object-cover object-center rounded-none"
          />
          <p className="absolute bottom-12 right-16 text-white text-2xl font-script">
            make it real.
          </p>
        </div>
      </div>
    </>
  );
}
