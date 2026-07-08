import { useMutation } from "@tanstack/react-query";
import { auth } from "../api/auth_api.js";

// Assumed to match the pattern of your existing useRegister hook.
export default function useVerifyRegisterOtp() {
  return useMutation({
    mutationFn: ({ otp, email }) => auth.verifyOtp(otp, email),
  });
}