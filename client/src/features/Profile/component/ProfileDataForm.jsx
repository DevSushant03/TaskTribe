import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, CheckCircle2 } from "lucide-react";
import { profileSchema } from "../validator/profile_schema";
import useUpdateProfileData from "../hooks/useUpdateProfileData";
import SkillsField from "./SkillsField";
import SocialLinksFields from "./SocialLinksField";

export default function ProfileDataForm({ user }) {
  const { mutate, isPending, isSuccess } = useUpdateProfileData();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      surname: user?.surname ?? "",
      bio: user?.bio ?? "",
      skills: user?.skills ?? [],
      socialLinks: {
        instagram: user?.socialLinks?.instagram ?? "",
        facebook: user?.socialLinks?.facebook ?? "",
        github: user?.socialLinks?.github ?? "",
        linkedin: user?.socialLinks?.linkedin ?? "",
        portfolio: user?.socialLinks?.portfolio ?? "",
      },
    },
  });

  useEffect(() => {
    if (isSuccess) reset(undefined, { keepValues: true });
  }, [isSuccess]);

  const onSubmit = (data) => mutate(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Surname
          </label>
          <input
            type="text"
            {...register("surname")}
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          {errors.surname && (
            <p className="mt-1 text-xs text-red-400">
              {errors.surname.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">
          Bio
        </label>
        <textarea
          rows={3}
          {...register("bio")}
          placeholder="Tell people what you do"
          className="w-full resize-none rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
        {errors.bio && (
          <p className="mt-1 text-xs text-red-400">{errors.bio.message}</p>
        )}
      </div>

      <SkillsField control={control} error={errors.skills} />

      <SocialLinksFields register={register} errors={errors} />

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-800">
        {isSuccess && !isDirty && (
          <span className="flex items-center gap-1 text-sm text-emerald-400">
            <CheckCircle2 className="h-4 w-4" /> Saved
          </span>
        )}
        <button
          type="submit"
          disabled={isPending || !isDirty}
          className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2 text-sm font-medium text-neutral-950 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
