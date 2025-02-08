import { Link } from "react-router";

function NavigationLinks() {
  const links = [
    { text: "Protein Pathway", href: "/pathway-data" },
    { text: "Glycan Synthetic Pathway", href: "/" },
  ];

  return (
    <nav className="flex gap-5 items-center self-stretch my-auto text-base min-w-[240px] text-neutral-900">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.href}
          className="self-stretch my-auto min-h-[24px]"
        >
          {link.text}
        </Link>
      ))}
    </nav>
  );
}

export default NavigationLinks;
