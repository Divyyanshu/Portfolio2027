import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { profile } from "../data";
import logo from "../assests/logo/logodiv.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const cls = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm transition ${
      isActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 sm:px-6">
        <Link
          to="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <img
            src={logo}
            alt="Portfolio Logo"
            className="h-20 w-20 rounded-full object-cover"
          />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={cls}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/contact"
          className="btn-primary hidden !px-5 !py-2 md:inline-flex"
        >
          Hire me
        </Link>

        <button
          className="grid h-9 w-9 place-items-center rounded-full border border-line md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-4 bg-white before:absolute before:-translate-y-1.5 before:block before:h-0.5 before:w-4 before:bg-white after:absolute after:translate-y-1.5 after:block after:h-0.5 after:w-4 after:bg-white" />
        </button>
      </nav>

      {open && (
        <div className="glass mx-auto mt-2 flex max-w-6xl flex-col rounded-3xl p-3 md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={cls}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
