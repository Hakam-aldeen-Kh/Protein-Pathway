import { Link } from "react-router";

function NavigationLinks() {
  const links = [
    { text: "Protein Pathway", href: "/protein-pathway-data" },
    { text: "Glycan Synthetic Pathway", href: "/glycan-pathway-data" },
  ];

  return (
    <nav className="flex gap-5 items-center self-stretch my-auto text-base min-w-[240px] text-neutral-900">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.href}
          className="relative self-stretch my-auto min-h-[24px] after:content-[''] after:absolute after:left-1/2 after:-bottom-[5px] after:w-0 after:h-[1.8px] after:bg-[#57369E] after:transition-all after:duration-500 hover:after:left-0 hover:after:w-full"
        >
          {link.text}
        </Link>
      ))}
    </nav>
  );
}

export default NavigationLinks;
