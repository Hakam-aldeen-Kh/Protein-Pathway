import InputField from "../../../common/InputField";
import { Link } from "react-router";
import { useResetPassword } from "../../../hooks/useResetPassword";

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    showPassword,
    isSubmitting,
    validation,
    validationCases,
    passwordsMatch,
    handleResetPasswordSubmit,
    togglePasswordVisibility,
  } = useResetPassword();

  // Calculate if submit should be enabled
  const submitEnabled = isValid && passwordsMatch;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative" // Added relative position
      style={{
        background:
          "linear-gradient(90deg, rgba(87, 54, 158, 0.2) 0%, rgba(0, 167, 211, 0.2) 100%)",
      }}
    >
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="absolute inset-0 z-20 bg-slate-800 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-t-transparent border-[#57369E]"></div>
            <p className="mt-4 text-gray-700 font-medium">
              Resetting your password...
            </p>
          </div>
        </div>
      )}

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
            Reset Your Password
          </h2>

          <form
            onSubmit={handleSubmit(handleResetPasswordSubmit)}
            className="space-y-5 px-[24px] py-[40px]"
          >
            <>
              <InputField
                label="Password"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                register={register}
                error={errors.password?.message}
                showPassword={showPassword}
                togglePassword={togglePasswordVisibility}
              />

              <InputField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Re Enter Your Password"
                register={register}
                error={errors.confirmPassword?.message}
                showPassword={showPassword}
                togglePassword={togglePasswordVisibility}
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
                <Link
                  to="/reset-password"
                  className="px-8 py-[10px] text-[#57369E] hover:text-[#00A7D3] font-semibold transition-all duration-200 text-center"
                >
                  Back
                </Link>
                <button
                  type="submit"
                  disabled={!submitEnabled || isSubmitting} // Also disable when submitting
                  className={`px-8 py-[10px] rounded-sm text-white font-semibold transition-all duration-200 
                    ${
                      submitEnabled && !isSubmitting
                        ? "bg-[#57369E] hover:bg-[#00A7D3]"
                        : "bg-[#BBBBBB]"
                    }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
