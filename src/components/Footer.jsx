import { Link } from "react-router-dom";
import { profile } from "../data";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-line">
      <div className="container-x flex flex-col items-center justify-between gap-4 py-8 text-sm text-white/50 sm:flex-row">
        <div>
          © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind & Three.js.
        </div>
        <div className="flex items-center gap-5">
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="hover:text-white">
            GitHub
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-white">
            Email
          </a>
          <Link to="/contact" className="hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
