import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `border-b-2 pb-1 text-sm font-medium tracking-wide transition ${
      isActive
        ? "border-[#d9b98a] text-[#d9b98a]"
        : "border-transparent text-[#f5efe6] hover:text-[#d9b98a]"
    }`;

  return (
    <div className="sticky top-0 z-10 bg-[#2f4a3c] shadow-md">
      <ul className="mx-auto flex max-w-3xl items-center gap-8 px-4 py-4">
        <li>
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/pastes" className={linkClass}>
            Pastes
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;