import { useContext } from "react";
import { UserContext } from "../../../Context/UserProvider";
import ProfileAvatarUpload from "../component/ProfileAvatarUpload";
import ProfileDataForm from "../component/ProfileDataForm";

export default function ProfilePage() {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <p className="text-neutral-500 text-sm">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <p className="text-neutral-500 text-sm">No profile found.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-scroll bg-neutral-950 py-10 px-10">
      <div className="mx-auto space-y-6 ">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-100">
            Your profile
          </h1>
          <p className="text-sm text-neutral-500">
            Update your photo and public details
          </p>
        </div>

        <div className="flex justify-center">
          <ProfileAvatarUpload
            photo={user.photo}
            name={user.name}
            surname={user.surname}
          />
        </div>

        <ProfileDataForm user={user} />
      </div>
    </div>
  );
}