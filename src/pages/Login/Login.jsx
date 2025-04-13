import { useState } from "react";
import InputField from "../../common/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/loginSchema";
import { useLogin } from "../../hooks/useLogin";
import { Link } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { handleSubmit: loginSubmit } = useLogin();

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

        {/* Login Form */}
        <div className="bg-white rounded-lg border border-[#BBBBBB] min-w-[45%] max-w-md">
          <h2 className="text-xl font-bold px-[24px] py-[16px] border-b-2">
            Sign In
          </h2>
          <form
            onSubmit={handleSubmit(loginSubmit)}
            className="space-y-5 px-[24px] py-[40px]"
          >
            <InputField
              label="Username"
              name="username"
              register={register}
              error={errors.username?.message}
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              register={register}
              error={errors.password?.message}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
            />

            <div className="w-full flex items-end">
              <button
                type="submit"
                disabled={!isValid}
                className={`px-8 py-[10px] ml-auto rounded-sm text-white font-semibold transition-all ${
                  isValid ? "bg-[#57369E] hover:bg-[#00A7D3]" : "bg-[#BBBBBB]"
                }`}
              >
                Log In
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link
                to="/reset-password"
                className="text-[#57369E] hover:text-[#00A7D3]"
              >
                Forgot Password?
              </Link>
              <div className="text-black">
                Need an account?{" "}
                <Link
                  to="/register"
                  className="text-[#57369E] hover:text-[#00A7D3]"
                >
                  Register here
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
