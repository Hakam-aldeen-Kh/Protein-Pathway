import LanguageSelector from "../components/LanguageSelector";
import AuthButtons from "../components/AuthButtons";
import NavigationLinks from "../components/NavigationLinks";
import SearchBox from "../components/SearchBox";
import { Link } from "react-router";
import { useLocation, useNavigate } from "react-router";

function Header() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const location = useLocation();
  const isLoginPage = location.pathname === "/login"; // Check if on login page
  const navigate = useNavigate()

  return (
    <header className="flex flex-col px-5 py-3 bg-white">
      <div className="flex justify-between lg:space-x-[40px] items-center w-full">
        {/* Logo */}
        <Link to="/" className="w-[150px] md:w-[200px]">
          <img src="/Logo.svg" alt="Company Logo" />
        </Link>

        {/* Desktop Menu */}
        <nav className="flex justify-between items-center w-full">
          <div className="flex gap-10">
            <NavigationLinks />
            <SearchBox />
          </div>
          <div className="flex gap-10">
            <LanguageSelector />
            {isLoggedIn ? <img src="/images/profile.png" className="w-10 h-10 rounded-full" /> : !isLoginPage && <AuthButtons />}
            {isLoggedIn && <button
              onClick={() => {
                localStorage.clear();
                navigate("/login")
              }}
              className="px-5 ml-auto bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Log out
            </button>}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
