import { SOCIAL_PLATFORMS } from "../constants/social-icons";

export default function SocialLinksFields({ register, errors }) {
  return (
    <div>
      <p className="block text-sm font-medium text-neutral-300 mb-2">
        Social links
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {SOCIAL_PLATFORMS.map(({ key, label, icon: Icon, placeholder }) => (
          <div key={key}>
            <div className="flex items-center gap-2 rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500">
              <Icon className="h-4 w-4 text-neutral-500 shrink-0" />
              <input
                type="text"
                placeholder={placeholder}
                {...register(`socialLinks.${key}`)}
                className="w-full bg-transparent text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none"
              />
            </div>
            {errors?.socialLinks?.[key] && (
              <p className="mt-1 text-xs text-red-400">
                {errors.socialLinks[key].message}
              </p>
            )}
            <span className="sr-only">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
