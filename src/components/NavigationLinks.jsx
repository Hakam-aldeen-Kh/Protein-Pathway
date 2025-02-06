function NavigationLinks() {
  const links = [
    { text: "Protein Pathway", href: "new-pathway" },
    { text: "Glycan Synthetic Pathway", href: "glycan-pathway" }
  ];

  return (
    <nav className="flex flex-wrap lg:flex-nowrap gap-5 items-center self-stretch my-auto text-base lg:min-h-[40px] min-w-[240px] text-neutral-900">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="self-stretch my-auto min-h-[24px] w-full lg:w-auto border-b-[1px] lg:border-0 border-gray-500 pb-3 lg:pb-0"
        >
          {link.text}
        </a>
      ))}
    </nav>
  );
}

export default NavigationLinks;