import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import useUpdateProfilePic from "../hooks/useUpdateProfilePic";
import { getInitials } from "../utils";

export default function ProfileAvatarUpload({ photo, name, surname }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const { mutate, isPending } = useUpdateProfilePic();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    // NOTE: adjust the field name below to whatever changeProfilePic expects
    formData.append("photo", file);
    mutate(formData);
  };

  const displaySrc = preview || photo;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative group">
        <div className="h-28 w-28 rounded-full p-[3px] bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600">
          <div className="h-full w-full rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center">
            {displaySrc ? (
              <img src={displaySrc} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <span className="text-2xl font-semibold text-neutral-300">
                {getInitials(name, surname)}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
          className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 group-hover:bg-black/50 transition-colors disabled:cursor-not-allowed"
          aria-label="Change profile photo"
        >
          {isPending ? (
            <Loader2 className="h-6 w-6 text-orange-400 animate-spin" />
          ) : (
            <Camera className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <p className="text-xs text-neutral-500">
        {isPending ? "Uploading..." : "Click photo to change"}
      </p>
    </div>
  );
}