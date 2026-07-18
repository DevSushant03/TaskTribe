import { useFormContext } from "react-hook-form";

export default function TitleField() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const title = watch("title", "");
  return (
    <div>
      <label className="block text-white-700 font-medium mb-1">
        Title <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-300 ${
          errors.title ? "border-red-500" : "border-white-300"
        }`}
        placeholder="Enter task title"
        {...register("title")}
      />
      {errors.title && (
        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
      )}
      <p className="text-gray-400 text-xs mt-1">
        {title.length}/100 characters
      </p>
    </div>
  );
}
