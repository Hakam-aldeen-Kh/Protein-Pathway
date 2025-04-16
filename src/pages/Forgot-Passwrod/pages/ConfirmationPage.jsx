import { Link } from "react-router";

const ConfirmationPage = () => {
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
            A reset password link have been sent, open your email and click the
            link to reset your password.
          </p>
          <p>
            Didn’t receive a link?{" "}
            <Link
              to="/reset-password/reset"
              className="hover:underline text-[#57369E] hover:text-[#00A7D3] transition duration-200 "
            >
              Resend
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
