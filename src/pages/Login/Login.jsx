import LoginInput from "./components/LoginInput";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const {
    showPassword,
    setShowPassword,
    activeButton,
    formData,
    handleChange,
    handleSubmit,
  } = useLogin();

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
          <img src="/images/Logo.svg" className="w-3/4 h-[231px]" alt="Company Logo" />
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg border border-[#BBBBBB] min-w-[45%] max-w-md">
          <h2 className="text-xl font-bold px-[24px] py-[16px] border-b-2">
            Sign In
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-5 px-[24px] py-[40px]"
          >
            <LoginInput
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />

            <LoginInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
            />

            <div className="w-full flex items-end">
              <button
                type="submit"
                disabled={!activeButton}
                className={`px-8 py-[10px] ml-auto rounded-sm text-white rounded-mdtransition-colors font-semibold transition-all ${activeButton === true
                  ? "bg-[#57369E] hover:bg-[#00A7D3]"
                  : "bg-[#BBBBBB]"
                  }`}
              >
                Log In
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-[#57369E] hover:text-[#00A7D3]">
                Forgot Password?
              </a>
              <div className="text-black">
                Need an account?{" "}
                <a href="/register" className="text-[#57369E] hover:text-[#00A7D3]">
                  Register here
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
