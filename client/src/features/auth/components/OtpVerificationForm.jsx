export default function OtpVerificationForm({ otp, setOtp, email, onVerify, loading }) {
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="max-w-md mx-auto w-full mt-16">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-orange-200/50 shadow-neumorph-inset">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Verify Your Email
        </h2>

        <p className="text-sm text-center text-gray-600 mb-6">
          Enter the 6-digit OTP sent to <br />
          <span className="font-semibold">{email}</span>
        </p>

        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-center text-lg font-bold bg-white/90 border-2 border-orange-200/70 rounded-xl focus:border-orange-400 focus:outline-none shadow-neumorph-sm"
            />
          ))}
        </div>

        <button
          onClick={onVerify}
          disabled={loading}
          className="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold hover:from-orange-600 hover:to-orange-700 border-2 border-orange-400/60 hover:shadow-neumorph-orange transition-all duration-300 text-lg"
        >
          {loading ? "Verifying...." : "Verify OTP"}
        </button>

        <p className="text-xs text-center text-gray-500 mt-4">
          OTP valid for 15 minutes
        </p>
      </div>
    </div>
  );
}