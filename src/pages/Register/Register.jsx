import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import LoginInput from "../Login/components/LoginInput";

const Register = () => {
  const [step, setStep] = useState(1); // Step 1: Initial fields, Step 2: Password fields
  const [activeNextButton, setActiveNextButton] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  // Enable/disable Next button based on Step 1 fields
  useEffect(() => {
    if (
      formData.email.length > 0 &&
      formData.firstName.length > 0 &&
      formData.lastName.length > 0 &&
      agreePrivacy
    ) {
      setActiveNextButton(true);
    } else {
      setActiveNextButton(false);
    }
  }, [formData, agreePrivacy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { handleSubmit } = useLogin();

  // Move to Step 2 and show password
  const handleNextClick = (e) => {
    e.preventDefault();
    setStep(2); // Move to password step
    setShowPassword(true); // Optional: Show password (can remove if not needed)
  };

  // Go back to Step 1
  const handleBackClick = () => {
    setStep(1);
    setShowPassword(false); // Optional: Hide password again
  };

  // Handle final form submission
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    // Add password validation here if needed
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    handleSubmit(e); // Call the original submit handler
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

        {/* Register Form */}
        <div className="bg-white rounded-lg border border-[#BBBBBB] min-w-[45%] max-w-md">
          <h2 className="text-xl font-bold px-[24px] py-[16px] border-b-2">
            Register
          </h2>

          <form
            onSubmit={step === 1 ? handleNextClick : handleFinalSubmit}
            className="space-y-5 px-[24px] py-[40px]"
          >
            {/* Step 1: Initial Fields */}
            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-5">
                  <LoginInput
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <LoginInput
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <LoginInput
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                    disabled={!activeNextButton}
                    className={`px-8 py-[10px] ml-auto rounded-sm text-white rounded-md transition-colors font-semibold transition-all ${
                      activeNextButton
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

            {/* Step 2: Password Fields */}
            {step === 2 && (
              <>
                <LoginInput
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  showPassword={showPassword}
                  togglePassword={() => setShowPassword(!showPassword)}
                />

                <LoginInput
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  placeholder="Re Enter Your Password"
                  onChange={handleChange}
                  showPassword={showPassword}
                  togglePassword={() => setShowPassword(!showPassword)}
                />

                {/* Password Requirements */}
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

                {/* Back and Submit Buttons */}
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
                    className="px-8 py-[10px] rounded-sm text-white bg-[#57369E] hover:bg-[#00A7D3] font-semibold transition-all"
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
