import { useMutation } from "@tanstack/react-query";
import { auth } from "../api/auth_api.js";

export default function useSendOtp() {
  return useMutation({
    mutationFn: (email) => auth.generateAndStoreOtpforRegister(email),
  });
}
