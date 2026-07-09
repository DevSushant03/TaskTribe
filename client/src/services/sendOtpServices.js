import emailjs from "@emailjs/browser";

export const sendOtpService = async (
  email,
  otp,
  expiryTime,
  title,
  message,
) => {
  await emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      email: email,
      title,
      message,
      highlight: otp,
      footer_note: `This OTP is valid for 15 minutes till ${expiryTime}. Do not share this OTP with anyone.`,
      year: new Date().getFullYear(),
      company_name: "TaskTribe",
      website_url: "https://tasktribe-plum.vercel.app",
      logo_url: "https://tasktribe-plum.vercel.app/icon.jpeg",
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  );
};
