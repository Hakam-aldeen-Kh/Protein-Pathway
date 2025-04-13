import { useForm } from "react-hook-form";
import InputField from "../../../common/InputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";

const emailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

const EmailInputPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleEmailSubmit = (data) => {
    console.log(data);
    navigate("/confirm-email");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(90deg, rgba(87, 54, 158, 0.2) 0%, rgba(0, 167, 211, 0.2) 100%)",
      }}
    >
      <div className="w-full max-w-[1200px] flex items-center justify-between">
        {/* Logo Section */}
        <div className="hidden lg:flex items-center space-x-4 flex-1">
          <img
            src="/images/Logo.svg"
            className="w-3/4 h-[231px]"
            alt="Company Logo"
          />
        </div>

        {/* Reset password Form */}
        <div className="bg-white rounded-lg border border-[#BBBBBB] min-w-[45%] max-w-md">
          <h2 className="text-xl font-bold px-[24px] py-[16px] border-b-2">
            Reset Your Password
          </h2>
          <form
            onSubmit={handleSubmit(handleEmailSubmit)}
            className="space-y-5 px-[24px] py-[40px]"
          >
            <p>Enter your email in order to receive a password reset link</p>
            <InputField
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter Your Registered Email"
              isRequired
              register={register}
              error={errors.email?.message}
            />

            <div className="grid grid-cols-2 mt-6 gap-x-5">
              <Link
                to="/login"
                className="px-8 py-[10px] text-[#57369E] hover:text-[#00A7D3] font-semibold transition-all duration-200 text-center"
              >
                Back
              </Link>
              <button
                type="submit"
                disabled={!isValid}
                className={`px-8 py-[10px] rounded-sm text-white font-semibold transition-all duration-200 ${
                  isValid ? "bg-[#57369E] hover:bg-[#00A7D3]" : "bg-[#BBBBBB]"
                }`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailInputPage;
