import { useFormContext } from "react-hook-form";

export default function DeadlineField() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label className="block text-white-700 font-medium mb-1">
        Deadline <span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        min={new Date().toISOString().split("T")[0]}
        className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-300 ${
          errors.deadline ? "border-red-500" : "border-white-300"
        }`}
        {...register("deadline")}
      />
      {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>}
    </div>
  );
}