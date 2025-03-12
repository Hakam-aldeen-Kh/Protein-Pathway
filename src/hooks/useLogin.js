import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const useLogin = () => {
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

  return {
    showPassword,
    setShowPassword,
    activeButton,
    formData,
    handleChange,
    handleSubmit,
  };
};
