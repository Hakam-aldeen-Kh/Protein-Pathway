import { useForm } from "react-hook-form";
import InputField from "../../../common/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../../../validation/resetPasswordSchema";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState({
    length: false,
    lowerCase: false,
    upperCase: false,
    specialCharacter: false,
    oneNumber: false,
  });

  const validationCases = [
    "At least 8 characters",
    "At least 1 lowercase letter",
    "At least 1 uppercase letter",
    "At least 1 special character",
    "At least 1 number",
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const formValues = watch();

  // Add useEffect to validate password in real-time
  useEffect(() => {
    const password = formValues.password || "";
    setValidation({
      length: password.length >= 8,
      lowerCase: /[a-z]/.test(password),
      upperCase: /[A-Z]/.test(password),
      specialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      oneNumber: /[0-9]/.test(password),
    });
  }, [formValues.password]);

  const handleResetPasswordSubmit = (data) => {
    console.log(data);
    navigate("/login");
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
                togglePassword={() => setShowPassword(!showPassword)}
              />

              <InputField
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
                <Link
                  to="/reset-password"
                  className="px-8 py-[10px] text-[#57369E] hover:text-[#00A7D3] font-semibold transition-all duration-200 text-center"
                >
                  Back
                </Link>
                <button
                  type="submit"
                  disabled={!isValid}
                  className={`px-8 py-[10px] rounded-sm text-white font-semibold transition-all duration-200 
                    ${
                      isValid
                        ? "bg-[#57369E] hover:bg-[#00A7D3]"
                        : "bg-[#BBBBBB]"
                    }`}
                >
                  Submit
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
