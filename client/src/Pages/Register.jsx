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

export default function Register() {
  const navigate = useNavigate();
  const [loading,setloading]=useState(false);
  const [error,seterror] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setloading(true)
    try {
      const response = await auth.register(data);

      if (response.data.success) {
        setloading(false)
        navigate("/auth");
      } else {
        setloading(false)
        seterror(response.data.message)
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      setloading(false)
      toast.error(error.message || "Registration failed");
      seterror(error.message)
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        
        <div className="flex-1 flex flex-col justify-center px-8 py-8 bg-[#f0f8ff]">
          <div className="max-w-md mx-auto w-full mt-10">
            <h2 className="text-center text-2xl font-semibold mb-6">Sign up</h2>

            <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 mb-3 hover:bg-gray-100">
              <FcGoogle className="h-5 w-5 mr-2" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center bg-blue-600 text-white rounded-lg py-2 mb-4 hover:bg-blue-700">
              <FaFacebookF className="h-5 w-5 mr-2" />
              Continue with Facebook
            </button>

            <div className="flex items-center my-3">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 text-gray-500 font-bold">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="flex space-x-3 mb-3">
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="First Name"
                    {...register("name")}
                    className="w-full py-2 px-3 border border-gray-300 rounded"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                  )}
                </div>

                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...register("surname")}
                    className="w-full py-2 px-3 border border-gray-300 rounded"
                  />
                  {errors.surname && (
                    <p className="text-red-500 text-sm">{errors.surname.message}</p>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="w-full py-2 px-3 border border-gray-300 rounded"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="relative mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  className="w-full py-2 px-3 border border-gray-300 rounded pr-10"
                />
                <FaRegEyeSlash className="absolute right-3 top-3 text-gray-400" />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
              {
                error && ( <p className="bg-red-100 border-1 border-solid p-2 my-2 rounded-sm text-red-500 text-sm">{error}</p>)
              }
              

              <div className="flex items-center mb-3 text-sm">
                <input type="checkbox" className="mr-2" />
                <span>
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:underline">User Agreement</a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
              >
                {loading?"loading...":"Join TaskTribe"}
              </button>
            </form>

            {/* Login link */}
            <p className="mt-5 text-center text-sm">
              Already have an account?{" "}
              <Link to="/auth" className="text-blue-600">
                Sign In
              </Link>
            </p>

            <p className="mt-10 text-center underline">
              <Link to="/"> {"< "}Back to home</Link>
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
