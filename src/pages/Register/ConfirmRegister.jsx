import axios from "axios";
import { Link, useLocation } from "react-router";
import Swal from "sweetalert2";

const ConfirmRegister = () => {
  // Get the email from URL parameters
  const location = useLocation();
  const email = location.state?.email || "your email address";
  console.log(email);

  const handleResend = async () => {
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
      const response = await axios.post(
        "https://clean-architcture-express.vercel.app/api/auth/resend-verification",
        { email: email }
      );

      Toast.fire({
        icon: "success",
        timer: 6000,
        title: response.data.message || "Registration successful",
      });

      return response;
    } catch (error) {
      console.error("Registration error:", error);

      Toast.fire({
        icon: "error",
        title:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(90deg, rgba(87, 54, 158, 0.2) 0%, rgba(0, 167, 211, 0.2) 100%)",
      }}
    >
      {/* Reset password Form */}
      <div className="bg-white rounded-lg w-[60%] py-[128px] text-center text-base text-[#232631]">
        <div className="w-[60%] mx-auto space-y-2">
          <h3 className="text-[#111118] text-3xl font-bold w-full">
            Check Your Email!
          </h3>
          <p>
            We have sent an email to <span className="font-bold">{email}</span>{" "}
            with a verification link, open your email and click the link to
            verify your account.
          </p>
          <p>
            <span>Did not receive a link? {" "}</span>
            <Link
              to="/login"
              state={{ email }}
              onClick={handleResend}
              className="hover:underline text-[#57369E] hover:text-[#00A7D3] transition duration-200"
            >
              Resend
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRegister;
