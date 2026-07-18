import { useFormContext } from "react-hook-form";

export default function DescriptionField() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const description = watch("description", "");
  return (
    <div>
      <label className="block text-white-700 font-medium mb-1">
        Description <span className="text-red-500">*</span>
      </label>
      <textarea
        rows="5"
        className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-300 ${
          errors.description ? "border-red-500" : "border-white-300"
        }`}
        placeholder="Describe the task…"
        {...register("description")}
      />
      {errors.description && (
        <p className="text-red-500 text-sm mt-1">
          {errors.description.message}
        </p>
      )}
      <p className="text-gray-400 text-xs mt-1">
        {description.length}/2000 characters
      </p>
    </div>
  );
}
