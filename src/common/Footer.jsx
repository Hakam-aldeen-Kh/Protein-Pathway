import footerData from "../context/footer.json";
import universities from "../context//universities.json";

// components
import ToTopButton from "../components/ToTopButton";

const Footer = () => {
  return (
    <section className="border-t border-[#484848] text-[#111118] font-normal text-xs lg:text-base p-4 lg:px-5 lg:py-10 space-y-10 flex items-center justify-center flex-col w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 w-full max-w-full justify-items-start xl:justify-items-center text-left">
        <div className="space-y-5 flex flex-col items-start justify-start">
          <a href={`mailto:${footerData.email.href}`}>{footerData.email.label}</a>
          <div className="flex justify-between items-center space-x-[16px]">
            <a href={footerData.twitter.href}>
              <img src="/images/icons/x.svg" alt="x logo" loading="lazy" />
            </a>
            <a href={footerData.youtube.href}>
              <img src="/images/icons/youtube.svg" alt="youtube logo" loading="lazy" />
            </a>
          </div>
        </div>

        <div className="space-y-5 flex flex-col items-start justify-start">
          {footerData.linksGroup_1.map((item) => (
            <a key={item.id} href={item.href}>{item.label}</a>
          ))}
        </div>

        <div className="space-y-5 flex flex-col items-start justify-start">
          {footerData.linksGroup_2.map((item) => (
            <a key={item.id} href={item.href}>{item.label}</a>
          ))}
        </div>
        <ToTopButton />
      </div>

      <div className="flex flex-wrap items-center justify-center max-w-full gap-x-5 gap-y-10 lg:gap-x-10 lg:gap-y-20">
        {universities.map((item) => (
          <a key={item.id} href={item.href} target="_blank">
            <img src={item.imageSrc} alt={item.name} className="object-contain max-h-[60px] lg:max-h-[120px] w-auto" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Footer;
