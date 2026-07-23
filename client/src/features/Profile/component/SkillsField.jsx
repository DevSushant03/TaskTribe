import { useState } from "react";
import { Controller } from "react-hook-form";
import { X } from "lucide-react";

export default function SkillsField({ control, error }) {
  const [draft, setDraft] = useState("");

  return (
    <Controller
      name="skills"
      control={control}
      render={({ field: { value = [], onChange } }) => {
        const addSkill = () => {
          const trimmed = draft.trim();
          if (!trimmed || value.includes(trimmed)) {
            setDraft("");
            return;
          }
          onChange([...value, trimmed]);
          setDraft("");
        };

        const removeSkill = (skill) => {
          onChange(value.filter((s) => s !== skill));
        };

        return (
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Skills
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {value.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm px-3 py-1"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:text-orange-200"
                    aria-label={`Remove ${skill}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              onBlur={addSkill}
              placeholder="Type a skill and press Enter"
              className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
          </div>
        );
      }}
    />
  );
}