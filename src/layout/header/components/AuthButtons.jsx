import { Link } from "react-router";

function AuthButtons() {
  const buttons = [
    { text: "Login", href: "/login" },
    { text: "Register", href: "/register" },
  ];

  return (
    <>
      {buttons.map((button, index) => (
        <Link
          key={index}
          to={button.href}
          className="px-8 py-[10px] ml-auto rounded-sm text-white rounded-mdtransition-colors font-semibold transition-all bg-[#57369E] hover:bg-[#00A7D3]"
        >
          <span className="gap-1 self-stretch my-auto">{button.text}</span>
        </Link>
      ))}
    </>
  );
}

export default AuthButtons;
