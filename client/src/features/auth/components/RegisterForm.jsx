import { useFormContext } from "react-hook-form";
import PasswordInput from "./PasswordInput.jsx";
import CircularLoader from "../../../Components/ui/CircularLoader.jsx";

export default function RegisterForm({ onValid, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="max-w-md mx-auto w-full mt-10">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-2 text-center">
        Create Your Account
      </h2>
      <p className="text-sm text-center text-gray-600 mb-8">
        Join TaskTribe to post academic tasks, collaborate with peers, and
        build your student network.
      </p>

      <form
        onSubmit={handleSubmit(onValid)}
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
              <p className="text-orange-600 text-xs mt-1">{errors.name.message}</p>
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
              <p className="text-orange-600 text-xs mt-1">{errors.surname.message}</p>
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
            <p className="text-orange-600 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <PasswordInput name="password" placeholder="Password" error={errors.password} />

        <div className="flex items-center mb-4 mt-3 text-sm text-gray-700">
          <input
            type="checkbox"
            name="agreedRules"
            {...register("agreedRules")}
            className="mr-2 w-4 h-4 border-2 border-orange-300 rounded focus:border-orange-500 focus:ring-orange-400 shadow-neumorph-checkbox"
          />
          <span className="text-gray-600">
            I agree to the{" "}
            <a
              href="/TermsAndConditions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors"
            >
              User Agreement
            </a>{" "}
            and{" "}
            <a
              href="/PrivacyPolicy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors"
            >
              Privacy Policy
            </a>
            .
          </span>
        </div>
        {errors.agreedRules && (
          <p className="text-orange-600 text-xs -mt-3 mb-3">{errors.agreedRules.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold hover:from-orange-600 hover:to-orange-700 border-2 border-orange-400/60 hover:shadow-neumorph-orange hover:border-orange-500/80 focus:shadow-neumorph-orange-focus transition-all duration-300 text-lg"
        >
          {loading ? <CircularLoader /> : "Join TaskTribe"}
        </button>
      </form>
    </div>
  );
}