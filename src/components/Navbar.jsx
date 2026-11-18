import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="sticky top-0 z-10 bg-[#2f4a3c] shadow-md">
      <ul className="mx-auto flex max-w-3xl items-center gap-8 px-4 py-4">
        <li>
          <Link
            to="/"
            className="text-sm font-medium tracking-wide text-[#f5efe6] transition hover:text-[#d9b98a]"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/pastes"
            className="text-sm font-medium tracking-wide text-[#f5efe6] transition hover:text-[#d9b98a]"
          >
            Pastes
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
