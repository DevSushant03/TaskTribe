import { useFormContext } from "react-hook-form";

export default function BudgetField() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label className="block text-white-700 font-medium mb-1">
        Budget (₹) <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Min"
            className={`border rounded-lg p-3 focus:ring-2 focus:ring-orange-300 w-full ${
              errors.budgetMin ? "border-red-500" : "border-white-300"
            }`}
            {...register("budgetMin")}
          />
          {errors.budgetMin && (
            <p className="text-red-500 text-sm mt-1">{errors.budgetMin.message}</p>
          )}
        </div>
        <div>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Max"
            className={`border rounded-lg p-3 focus:ring-2 focus:ring-orange-300 w-full ${
              errors.budgetMax ? "border-red-500" : "border-white-300"
            }`}
            {...register("budgetMax")}
          />
          {errors.budgetMax && (
            <p className="text-red-500 text-sm mt-1">{errors.budgetMax.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}