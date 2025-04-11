const SocialLinks = ({ linkedin, xAccount }) => (
  <div className="flex items-center space-x-2">
    {linkedin && (
      <a
        href={linkedin}
        aria-label="LinkedIn profile"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/images/icons/linkedin-icon.svg"
          className="w-8"
          alt="LinkedIn icon"
        />
      </a>
    )}
    {xAccount && (
      <a
        href={xAccount}
        aria-label="X profile"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/images/icons/x-icon.svg" className="w-8" alt="X icon" />
      </a>
    )}
  </div>
);

export default SocialLinks;
