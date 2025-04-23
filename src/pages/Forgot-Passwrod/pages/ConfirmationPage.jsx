import { useState } from "react";
import Swal from "sweetalert2";
import api from "../../../utils/api";
import { useLocation } from "react-router";
import LoadingProcess from "../../../common/LoadingProcess";

const ConfirmationPage = () => {
  // Get the email from URL parameters
  const location = useLocation();
  const email = location.state?.email || "your email address";
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    try {
      const response = await api.post("auth/forgot-password", {
        email: email,
      });

      Toast.fire({
        icon: "success",
        timer: 6000,
        title: response.data.message || "Email resent successfully",
      });

      return response;
    } catch (error) {
      Toast.fire({
        icon: "error",
        title:
          error.response?.data?.message ||
          "Failed to resend email. Please try again.",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        background:
          "linear-gradient(90deg, rgba(87, 54, 158, 0.2) 0%, rgba(0, 167, 211, 0.2) 100%)",
      }}
    >
      {/* Loading Overlay */}
      {isResending && (
        <LoadingProcess label="Resending password reset email..." />
      )}

      {/* Reset password Form */}
      <div className="bg-white rounded-lg w-[60%] py-[128px] text-center text-base text-[#232631]">
        <div className="w-[60%] mx-auto space-y-2">
          <h3 className="text-[#111118] text-3xl font-bold w-full">
            Check Your Email!
          </h3>
          <p>
            A reset password link has been sent to{" "}
            <span className="font-medium">{email}</span>. Open your email and
            click the link to reset your password.
          </p>
          <p>
            Did not receive a link?{" "}
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
  );
};

export default ConfirmationPage;
