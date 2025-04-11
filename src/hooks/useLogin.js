import { useNavigate } from "react-router";

export const useLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    if (data.username === "admin" && data.password === "admin") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/"); // Redirect to home or dashboard
    } else {
      alert("Invalid username or password!");
    }
  };

  return { handleSubmit };
};
