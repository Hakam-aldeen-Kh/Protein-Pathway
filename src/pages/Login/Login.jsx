import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeButton, setActiveButton] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Use useEffect to detect autofill changes
  useEffect(() => {
    if (formData.username.length > 0 && formData.password.length > 0) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }, [formData]); // Runs whenever formData changes

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username === "admin" && formData.password === "admin") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/"); // Redirect to home or dashboard
    } else {
      alert("Invalid username or password!");
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
      <div className="w-full max-w-[1200px] flex items-center justify-between">
        {/* Logo Section */}
        <div className="hidden lg:flex items-center space-x-4 flex-1">
          <img src="/Logo.svg" className="w-3/4 h-[231px]" alt="Company Logo" />
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
            <div>
              <span className="text-red-500">*</span>
              <label className="inline-block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 focus:outline-none border border-black border-1"
                placeholder="Enter Your Username"
                required
              />
            </div>

            <div>
              <span className="text-red-500 mr-[2px]">*</span>
              <label className="inline-block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 focus:outline-none border border-black border-1"
                  placeholder="Enter Your Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <img
                    alt="show/hide password"
                    src={
                      showPassword
                        ? "/src/assets/svg/hidde-eye.svg"
                        : "/src/assets/svg/show-eye.svg"
                    }
                  />
                </button>
              </div>
            </div>

            <div className="w-full flex items-end">
              <button
                type="submit"
                disabled={!activeButton}
                className={`px-8 py-[10px] ml-auto rounded-sm text-white rounded-mdtransition-colors ${
                  activeButton === true
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
                <a href="#" className="text-[#57369E] hover:text-[#00A7D3]">
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
