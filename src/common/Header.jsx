import { useState } from "react";
import LanguageSelector from "../components/LanguageSelector";
import AuthButtons from "../components/AuthButtons";
import NavigationLinks from "../components/NavigationLinks";
import SearchBox from "../components/SearchBox";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex flex-col px-5 py-3 bg-white">
      <div className="flex justify-between lg:space-x-[40px] items-center w-full">
        {/* Logo */}
        <a href="/" className="w-[150px] lg:w-[200px]">
          <img src="/Logo.svg" alt="Company Logo" />
        </a>

        {/* Burger Icon */}
        <button
          className="md:hidden p-2 w-[40px]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img src="/images/icons/hamburger-menu.svg" alt="Menu" />
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex md:justify-between items-center w-full">
          <div className="flex gap-10">
            <NavigationLinks />
            <SearchBox />
          </div>
          <div className="flex gap-10">
            <LanguageSelector />
            <AuthButtons />
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col items-center mt-3 space-y-4 md:hidden">
          <NavigationLinks />
          <SearchBox />
          <LanguageSelector />
          <AuthButtons />
        </div>
      )}
    </header>
  );
}

export default Header;
