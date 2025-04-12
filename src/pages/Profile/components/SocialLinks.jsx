const SocialLinks = ({ links }) => {
  const iconMap = {
    Linkedin: "/images/icons/linkedin-icon.svg",
    X: "/images/icons/x-icon.svg",
  };
  const ariaLabels = {
    Linkedin: "LinkedIn profile",
    X: "X profile",
    Website: "Personal website",
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center flex-wrap">
        {links.map((link, index) => {
          const iconSrc = iconMap[link.title];
          if (!iconSrc) {
            return (
              <div key={index} className="w-full mt-5">
                <a
                  href={link.url}
                  className="text-xl text-[#111118] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabels[link.title] || `${link.title} profile`}
                >
                  {link.url}
                </a>
              </div>
            );
          }

          return (
            <a
              key={index}
              href={link.url}
              className="mr-2" // Manual spacing instead of space-x-2
              aria-label={ariaLabels[link.title] || `${link.title} profile`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={iconSrc} className="w-8" alt={`${link.title} icon`} />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinks;
