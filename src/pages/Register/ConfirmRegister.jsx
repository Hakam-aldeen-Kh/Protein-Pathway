import { useLocation } from "react-router";
import api from "../../utils/api";
import { useState } from "react";
import LoadingProcess from "../../common/LoadingProcess";
import { ShowToast } from "../../common/ToastNotification";

const ConfirmRegister = () => {
  // Get the email from URL parameters
  const location = useLocation();
  const [isResending, setIsResending] = useState(false);
  const email = location.state?.email || "your email address";

  const handleResend = async () => {
    setIsResending(true);
    try {
      const response = await api.post("auth/resend-verification", {
        email: email,
      });

      ShowToast(
        "Success",
        response.data.message || "Verification email resent successfully"
      );

      return response;
    } catch (error) {
      console.error("Resend verification error:", error);

      ShowToast(
        "Error",
        error.response?.data?.message ||
          "Failed to resend verification email. Please try again."
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      {isResending && (
        <LoadingProcess label="Resending verification email..." />
      )}
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background:
            "linear-gradient(90deg, rgba(87, 54, 158, 0.2) 0%, rgba(0, 167, 211, 0.2) 100%)",
        }}
      >
        <div className="bg-white rounded-lg w-[60%] py-[128px] text-center text-base text-[#232631]">
          <div className="w-[60%] mx-auto space-y-2">
            <h3 className="text-[#111118] text-3xl font-bold w-full">
              Check Your Email!
            </h3>
            <p>
              We have sent an email to{" "}
              <span className="font-bold">{email}</span> with a verification
              link, open your email and click the link to verify your account.
            </p>
            <p>
              <span>Did not receive a link? </span>
              <button
                className={`hover:underline text-[#57369E] hover:text-[#00A7D3] transition duration-200 ${
                  isResending ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleResend}
                disabled={isResending}
              >
                {isResending ? "Resending..." : "Resend"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmRegister;
