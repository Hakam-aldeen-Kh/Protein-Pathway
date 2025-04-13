import { Link } from "react-router";
import AuthInput from "../../common/auth/AuthInput";
import { useRegister } from "../../hooks/useRegister";

const Register = () => {
  const {
    step,
    agreePrivacy,
    showPassword,
    validation,
    validationCases,
    errors,
    isNextButtonEnabled,
    setAgreePrivacy,
    setShowPassword,
    isSubmitButtonEnabled,
    handleNextClick,
    handleBackClick,
    handleFinalSubmit,
    register,
    handleSubmit,
  } = useRegister();

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
                    <Link
                      to="/login"
                      className="text-[#57369E] hover:text-[#00A7D3]"
                    >
                      Sign In
                    </Link>
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

                <ul className="pl-5 text-sm">
                  {validationCases.map((oneCase, index) => {
                    const validationKeys = Object.keys(validation);
                    const isValid = validation[validationKeys[index]];
                    return (
                      <li
                        key={index}
                        className={`flex items-center gap-2 ${
                          isValid ? "text-green-600" : "text-gray-600"
                        }`}
                      >
                        {isValid ? (
                          <img
                            src="/images/icons/check-password.svg"
                            alt="check"
                          />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-gray-600 mt-1" />
                        )}
                        {oneCase}
                      </li>
                    );
                  })}
                </ul>

                <div className="grid grid-cols-2 mt-6 gap-x-5">
                  <button
                    type="button"
                    onClick={handleBackClick}
                    className="px-8 py-[10px] text-[#57369E] hover:text-[#00A7D3] font-semibold transition-all duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!isSubmitButtonEnabled()}
                    className={`px-8 py-[10px] rounded-sm text-white font-semibold transition-all duration-200 ${
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
