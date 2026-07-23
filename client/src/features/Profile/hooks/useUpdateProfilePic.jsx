import { users } from "../../auth/api/auth_api";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateProfilePic() {
  return useMutation({
    mutationFn: (formData) => users.changeProfilePic(formData),
  });
}
