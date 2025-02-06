import LanguageSelector from "../components/LanguageSelector";
import AuthButtons from "../components/AuthButtons";
import NavigationLinks from "../components/NavigationLinks";
import SearchBox from "../components/SearchBox";

function Header() {
  return (
    <header className="flex flex-col px-5 py-3 bg-white">
      <div className="flex justify-between lg:space-x-[40px] items-center w-full">
        {/* Logo */}
        <a href="/" className="w-[150px] md:w-[200px]">
          <img src="/Logo.svg" alt="Company Logo" />
        </a>

        {/* Desktop Menu */}
        <nav className="flex justify-between items-center w-full">
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
    </header>
  );
}

export default Header;
