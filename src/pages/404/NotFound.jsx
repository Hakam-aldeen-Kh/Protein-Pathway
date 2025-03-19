import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-70px)]">
      <img src="/images/404.png" alt="404 page" className="w-[60%]" />
      <div className="mt-[40px] text-center">
        <h3 className="text-[32px] font-bold">Opps!</h3>
        <p className="mt-2 text-[20px]">
          We couldn’t find the path you are looking for
        </p>
      </div>
      <Link
        to="/"
        className="flex gap-2 justify-center items-center px-8 py-1.5 bg-violet-900 text-white rounded-sm min-h-[32px] hover:bg-[#00A7D3] transition-colors duration-500 mt-10"
      >
        Back To Home Page
      </Link>
    </div>
  );
};

export default NotFound;
