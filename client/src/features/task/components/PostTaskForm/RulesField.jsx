import { useFormContext } from "react-hook-form";

export default function RulesField() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="my-4">
      <details className="mb-2 bg-[#161616] border border-orange-500/30 rounded-lg p-3 cursor-pointer group">
        <summary className="flex items-center cursor-pointer font-semibold text-orange-400 select-none">
          <input
            type="checkbox"
            id="agreeRules"
            className={`w-4 h-4 mr-2 accent-orange-600 ${
              errors.agreedRules ? "ring-2 ring-red-500" : ""
            }`}
            {...register("agreedRules")}
          />
          <label htmlFor="agreeRules" className="text-sm text-gray-300 select-none cursor-pointer">
            I have read and agree to the above rules and regulations.{" "}
            <span className="text-red-500">*</span>
          </label>
        </summary>
        <ul className="mt-3 ml-7 text-white text-sm space-y-2 list-disc">
          <li>Provide a clear and accurate task description.</li>
          <li>Mention expected deliverables, deadline, and budget (if applicable).</li>
          <li>Do not post illegal, unethical, or misleading tasks.</li>
          <li>Avoid sharing personal contact details in task description.</li>
          <li>Once a freelancer is assigned, editing the task may be restricted.</li>
          <li>TaskTribe is not responsible for disputes—clear instructions reduce conflicts.</li>
        </ul>
      </details>
      {errors.agreedRules && (
        <p className="text-red-500 text-sm mt-1">{errors.agreedRules.message}</p>
      )}
    </div>
  );
}