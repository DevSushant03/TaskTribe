import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import PasswordInput from "./PasswordInput.jsx";
import CircularLoader from "../../../Components/ui/CircularLoader.jsx";

export default function LoginForm({ onValid, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="max-w-md mx-auto mt-10 w-full">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
        Welcome Back to <span className="text-orange-500">TaskTribe</span>
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Log in to your account to post academic tasks, collaborate with peers,
        and grow your campus network.
      </p>

      <form
        onSubmit={handleSubmit(onValid)}
        className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-orange-200/50 shadow-neumorph-inset"
      >
        <input
          type="text"
          placeholder="Email or Username"
          {...register("email")}
          className="w-full mb-1 py-3 px-4 bg-white/90 backdrop-blur-sm border-2 border-orange-200/70 rounded-xl placeholder-gray-500 focus:border-orange-400 focus:shadow-neumorph-focus focus:outline-none transition-all duration-300 shadow-neumorph-sm"
        />
        {errors.email && (
          <p className="my-1 text-red-700 text-sm shadow-neumorph-red-sm ">
            {errors.email.message}
          </p>
        )}

        <div className="mt-2">
          <PasswordInput name="password" placeholder="Password" error={errors.password} />
        </div>

        <div className="flex justify-between items-center mb-4 mt-2 text-sm text-gray-700">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2 w-4 h-4 border-2 border-orange-300 rounded focus:border-orange-500 focus:ring-orange-400 shadow-neumorph-checkbox"
            />
            Remember me
          </label>
          <Link
            to="/auth/forgot-password"
            className="text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold hover:from-orange-600 hover:to-orange-700 border-2 border-orange-400/60 hover:shadow-neumorph-orange hover:border-orange-500/80 focus:shadow-neumorph-orange-focus transition-all duration-300 text-lg"
        >
          {loading ? <CircularLoader /> : "Log In"}
        </button>
      </form>

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
  );
}