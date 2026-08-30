import { Link } from "react-router-dom";
function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3 shrink-0">

        <img className="h-12 w-12 md:h-13 md:w-13 lg:h-14 lg:w-14 rounded-full active:scale-95" src="/logo.png" alt="logo" />

      <h1 className="text-lg font-bold sm:text-xl text-gray-900">
        Narkh Nama
      </h1>
    </Link>
  );
}

export default Logo;