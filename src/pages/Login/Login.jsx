import { useState } from 'react';
import { useNavigate } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    if (formData.username === "admin" && formData.password === "admin") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/"); // Redirect to home or dashboard
    } else {
      alert("Invalid username or password!");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(90deg, rgba(87, 54, 158, 0.2) 0%, rgba(0, 167, 211, 0.2) 100%)" }}>
      <div className="w-full max-w-[1200px] flex items-center justify-between">
        {/* Logo Section */}
        <div className="hidden lg:flex items-center space-x-4 flex-1">
          <img src="/Logo.svg" className='w-3/4 h-[231px]' alt="Company Logo" />
        </div>

        {/* Login Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-6">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className='w-full flex items-end'>
              <button
                type="submit"
                className="px-5 ml-auto bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Log In
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-purple-600 hover:text-purple-700">
                Forgot Password?
              </a>
              <div className="text-gray-600">
                Need an account?{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700">
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