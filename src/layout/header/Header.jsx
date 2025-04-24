import { Link } from "react-router";

import LanguageSelector from "./components/LanguageSelector";
import AuthButtons from "./components/AuthButtons";
import NavigationLinks from "./components/NavigationLinks";
import SearchBox from "./components/SearchBox";
import profileData from "../../data/profile/profile.json";
import { useAuth } from "../../hooks/useAuth"; // Make sure this path is correct

function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="flex flex-col px-5 py-3 bg-white">
      <div className="flex justify-between lg:space-x-[40px] items-center w-full">
        {/* Logo */}
        <Link to="/" className="w-[150px] md:w-[200px]">
          <img src="/images/Logo.svg" alt="Company Logo" />
        </Link>

        {/* Desktop Menu */}
        <nav className="flex justify-between items-center w-full">
          <div className="flex gap-10">
            <NavigationLinks />
            <SearchBox />
          </div>
          <div className="flex gap-10">
            <LanguageSelector />
            {isAuthenticated ? (
              <Link to={"/profile"}>
                <img
                  src={profileData.imageSrc}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </Link>
            ) : (
              !isAuthenticated && <AuthButtons />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
