import { useMutation } from "@tanstack/react-query";
import { users } from "../../auth/api/auth_api";

export default function useUpdateProfileData() {
  return useMutation({
    mutationFn:(data)=> users.editProfile(data),
  });
}
