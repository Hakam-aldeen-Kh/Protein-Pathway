function AuthButtons() {
  const buttons = [
    { text: "Login", href: "/login" },
    { text: "Register", href: "/register" },
  ];

  return (
    <>
      {buttons.map((button, index) => (
        <a
          key={index}
          href={button.href}
          className="flex gap-2 justify-center items-center self-stretch px-4 py-2.5 my-auto text-center bg-violet-900 rounded-sm min-h-[40px] text-sm font-semibold text-white whitespace-nowrap"
        >
          <span className="gap-1 self-stretch my-auto">{button.text}</span>
        </a>
      ))}
    </>
  );
}

export default AuthButtons;
