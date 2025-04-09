import { useState } from "react";
import AuthInput from "../../common/auth/AuthInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../validation/registerSchema";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const formValues = watch();

  const isNextButtonEnabled = () => {
    const { email, firstName, lastName } = formValues;
    const allFieldsFilled =
      email.length > 0 && firstName.length > 0 && lastName.length > 0;
    const isStep1Valid = !errors.firstName && !errors.lastName && !errors.email;
    return allFieldsFilled && isStep1Valid && agreePrivacy;
  };

  const isSubmitButtonEnabled = () => {
    const { password, confirmPassword } = formValues;
    const allFieldsFilled = password.length > 0 && confirmPassword.length > 0;
    const isStep2Valid = !errors.password && !errors.confirmPassword;
    return allFieldsFilled && isStep2Valid;
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    if (isNextButtonEnabled()) {
      setStep(2);
      setShowPassword(true);
    }
  };

  const handleBackClick = () => {
    setStep(1);
    setShowPassword(false);
  };

  const handleFinalSubmit = (data) => {
    console.log("Form submitted with:", data);
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
        <div className="hidden lg:flex items-center space-x-4 flex-1">
          <img
            src="/images/Logo.svg"
            className="w-3/4 h-[231px]"
            alt="Company Logo"
          />
        </div>

        <div className="bg-white rounded-lg border border-[#BBBBBB] min-w-[45%] max-w-md">
          <h2 className="text-xl font-bold px-[24px] py-[16px] border-b-2">
            Register
          </h2>

          <form
            onSubmit={
              step === 1 ? handleNextClick : handleSubmit(handleFinalSubmit)
            }
            className="space-y-5 px-[24px] py-[40px]"
          >
            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-5">
                  <AuthInput
                    label="First Name"
                    name="firstName"
                    register={register}
                    error={errors.firstName?.message}
                  />
                  <AuthInput
                    label="Last Name"
                    name="lastName"
                    register={register}
                    error={errors.lastName?.message}
                  />
                </div>

                <AuthInput
                  label="Email"
                  type="email"
                  name="email"
                  register={register}
                  error={errors.email?.message}
                />

                <div className="flex items-center gap-2 text-[14px]">
                  <input
                    type="checkbox"
                    checked={agreePrivacy}
                    className="w-4 h-4 sm:w-5 sm:h-5 accent-[#57369E] cursor-pointer"
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                  />
                  <p className="leading-5 text-xs sm:text-sm md:text-base text-[#111111]">
                    I agree to{" "}
                    <span className="text-[#57369E] cursor-pointer">
                      Terms & Conditions
                    </span>{" "}
                    and{" "}
                    <span className="text-[#57369E] cursor-pointer">
                      Privacy Policy
                    </span>
                  </p>
                </div>

                <div className="w-full flex items-end">
                  <button
                    type="submit"
                    disabled={!isNextButtonEnabled()}
                    className={`px-8 py-[10px] ml-auto rounded-sm text-white font-semibold transition-all ${
                      isNextButtonEnabled()
                        ? "bg-[#57369E] hover:bg-[#00A7D3]"
                        : "bg-[#BBBBBB]"
                    }`}
                  >
                    Next
                  </button>
                </div>

                <div className="flex items-center justify-end text-sm">
                  <div className="text-black">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="text-[#57369E] hover:text-[#00A7D3]"
                    >
                      Sign In
                    </a>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <AuthInput
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  register={register}
                  error={errors.password?.message}
                  showPassword={showPassword}
                  togglePassword={() => setShowPassword(!showPassword)}
                />

                <AuthInput
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Re Enter Your Password"
                  register={register}
                  error={errors.confirmPassword?.message}
                  showPassword={showPassword}
                  togglePassword={() => setShowPassword(!showPassword)}
                />

                <ul className="pl-5 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-600" />
                    At least 8 characters
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-600" />
                    At least 1 uppercase letter
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-600" />
                    At least 1 lowercase letter
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-600" />
                    At least 1 special character
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-600" />
                    At least 1 number
                  </li>
                </ul>

                <div className="grid grid-cols-2 mt-6">
                  <button
                    type="button"
                    onClick={handleBackClick}
                    className="text-[#57369E] hover:text-[#00A7D3] font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!isSubmitButtonEnabled()}
                    className={`px-8 py-[10px] rounded-sm text-white font-semibold transition-all ${
                      isSubmitButtonEnabled()
                        ? "bg-[#57369E] hover:bg-[#00A7D3]"
                        : "bg-[#BBBBBB]"
                    }`}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
