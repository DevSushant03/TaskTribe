import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInput({ name, placeholder, error }) {
  const { register } = useFormContext();
  const [show, setShow] = useState(false);

  return (
    <div className="relative mb-1">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        {...register(name)}
        className="w-full py-3 px-4 pr-12 bg-white/90 backdrop-blur-sm border-2 border-orange-200/70 rounded-xl placeholder-gray-500 focus:border-orange-400 focus:shadow-neumorph-focus focus:outline-none transition-all duration-300 shadow-neumorph-sm"
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-600 hover:text-orange-700"
      >
        {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
      </button>
      {error && <p className="my-1 text-red-700 text-sm shadow-neumorph-red-sm">{error.message}</p>}
    </div>
  );
}