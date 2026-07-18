import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function TagField() {
  const { control, formState: { errors } } = useFormContext();
  const [tagInput, setTagInput] = useState("");

  return (
    <Controller
      name="tags"
      control={control}
      defaultValue={[]}
      render={({ field: { value = [], onChange } }) => {
        const addTag = () => {
          if(value.length>5) return;
          if (!tagInput.trim()) return;
          onChange([...value, tagInput.trim()]);
          setTagInput("");
        };
        const removeTag = (key) => onChange(value.filter((_,index) => index != key));

        return (
          <div>
            <label className="block text-white-700 font-medium mb-2">
              Tags <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                className="flex-1 border border-white-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300"
                placeholder="Add a tag (e.g., Design) - Press Enter to add"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                maxLength={30}
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
              >
                Add
              </button>
            </div>
            {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
            <div className="flex flex-wrap gap-2 mt-3">
              {value.map((tag,index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="text-red-500 hover:text-red-700 transition"
                    aria-label={`Remove ${index} tag`}
                  >
                    ✖
                  </button>
                </span>
              ))}
            </div>
            <p className="text-gray-400 text-xs mt-1">{value.length}/5 tags</p>
          </div>
        );
      }}
    />
  );
}