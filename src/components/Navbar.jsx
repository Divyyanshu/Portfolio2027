import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import logo from "../assests/logo/logodiv.png";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

// All the glossy styling lives here so the component is self-contained.
// Light theme = green accent, dark theme = red accent (matches the 3D background).
const css = `
.nv-root{
  --nv-accent:#5c7800; --nv-accent-hi:#8fb300;
  --nv-glass:rgba(247,244,234,.62); --nv-glass-top:rgba(255,255,255,.8);
  --nv-edge:rgba(20,19,15,.10); --nv-edge-hi:rgba(255,255,255,.95);
  --nv-shadow:0 10px 30px -14px rgba(60,80,0,.30),0 2px 6px rgba(20,19,15,.05);
  --nv-shadow-up:0 18px 40px -16px rgba(60,80,0,.45),0 3px 10px rgba(20,19,15,.08);
  --nv-pill-top:rgba(255,255,255,.95); --nv-pill-bot:rgba(255,255,255,.45);
  --nv-pill-edge:rgba(92,120,0,.28);
  --nv-cta-top:#7da300; --nv-cta-bot:#475f00; --nv-cta-text:#f9f7ee;
  --nv-cta-glow:rgba(92,120,0,.5); --nv-sheen:.7;
}
.dark .nv-root{
  --nv-accent:#ff4d3d; --nv-accent-hi:#ff8a6b;
  --nv-glass:rgba(26,12,12,.55); --nv-glass-top:rgba(255,255,255,.14);
  --nv-edge:rgba(255,255,255,.09); --nv-edge-hi:rgba(255,255,255,.30);
  --nv-shadow:0 14px 40px -16px rgba(255,77,61,.30),0 2px 8px rgba(0,0,0,.45);
  --nv-shadow-up:0 22px 50px -16px rgba(255,77,61,.45),0 4px 14px rgba(0,0,0,.55);
  --nv-pill-top:rgba(255,255,255,.17); --nv-pill-bot:rgba(255,77,61,.14);
  --nv-pill-edge:rgba(255,120,100,.38);
  --nv-cta-top:#ff6a57; --nv-cta-bot:#cf2b1d; --nv-cta-text:#fff;
  --nv-cta-glow:rgba(255,77,61,.55); --nv-sheen:.16;
}

/* glass surface (nav + mobile panel) */
.nv-glass,.nv-shell{
  position:relative;
  background:linear-gradient(180deg,var(--nv-glass-top) 0%,transparent 55%),var(--nv-glass);
  -webkit-backdrop-filter:blur(18px) saturate(1.7); backdrop-filter:blur(18px) saturate(1.7);
  border:1px solid var(--nv-edge);
  box-shadow:var(--nv-shadow),inset 0 1px 0 var(--nv-edge-hi),inset 0 -1px 0 rgba(0,0,0,.05);
  transition:box-shadow .35s ease,padding .3s ease;
}
.nv-shell[data-scrolled="true"]{box-shadow:var(--nv-shadow-up),inset 0 1px 0 var(--nv-edge-hi),inset 0 -1px 0 rgba(0,0,0,.05)}

/* one gloss sweep when the page loads */
.nv-shell{overflow:hidden}
.nv-shell::after{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,var(--nv-sheen)) 50%,transparent 65%);
  transform:translateX(-120%);animation:nv-sheen 1.6s .5s ease-out 1 forwards;
}
@keyframes nv-sheen{to{transform:translateX(120%)}}

/* gliding pill behind the links */
.nv-pill{
  position:absolute;top:0;left:0;height:100%;border-radius:9999px;pointer-events:none;
  background:linear-gradient(180deg,var(--nv-pill-top),var(--nv-pill-bot));
  border:1px solid var(--nv-pill-edge);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 8px 16px -10px var(--nv-cta-glow);
  transition:opacity .25s ease;
}
.nv-pill[data-ready="true"]{
  transition:transform .45s cubic-bezier(.22,1,.36,1),width .45s cubic-bezier(.22,1,.36,1),opacity .25s ease;
}

/* logo ring */
.nv-logo{
  padding:2px;border-radius:9999px;display:block;
  background:conic-gradient(from 140deg,var(--nv-accent-hi),transparent 40%,var(--nv-accent),var(--nv-accent-hi));
  box-shadow:0 4px 14px -6px var(--nv-cta-glow);
  transition:transform .45s cubic-bezier(.22,1,.36,1);
}
.nv-logo:hover{transform:rotate(-6deg) scale(1.06)}

/* glossy call-to-action */
.nv-cta{
  position:relative;overflow:hidden;display:inline-flex;align-items:center;gap:.5rem;
  border-radius:9999px;padding:.6rem 1.2rem;font-size:.875rem;font-weight:600;line-height:1;
  color:var(--nv-cta-text);
  background:linear-gradient(180deg,var(--nv-cta-top),var(--nv-cta-bot));
  border:1px solid rgba(255,255,255,.2);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.45),inset 0 -2px 5px rgba(0,0,0,.2),0 8px 20px -8px var(--nv-cta-glow);
  transition:transform .2s ease,box-shadow .3s ease;
}
.nv-cta::before{
  content:"";position:absolute;left:0;right:0;top:0;height:50%;pointer-events:none;
  background:linear-gradient(180deg,rgba(255,255,255,.35),rgba(255,255,255,0));
}
.nv-cta::after{
  content:"";position:absolute;top:0;bottom:0;left:-60%;width:40%;pointer-events:none;
  background:linear-gradient(105deg,transparent,rgba(255,255,255,.55),transparent);
  transform:skewX(-20deg);transition:left .7s ease;
}
.nv-cta:hover::after{left:130%}
.nv-cta:hover{transform:translateY(-1px);box-shadow:inset 0 1px 0 rgba(255,255,255,.5),inset 0 -2px 5px rgba(0,0,0,.2),0 12px 26px -8px var(--nv-cta-glow)}
.nv-cta:active{transform:translateY(0) scale(.98)}
.nv-cta>*{position:relative;z-index:1}
.nv-cta svg{transition:transform .25s ease}
.nv-cta:hover svg{transform:translateX(3px)}

/* hamburger -> X */
.nv-burger{
  position:relative;width:2.5rem;height:2.5rem;border-radius:9999px;
  border:1px solid var(--nv-edge);
  background:linear-gradient(180deg,var(--nv-pill-top),var(--nv-pill-bot));
  box-shadow:inset 0 1px 0 var(--nv-edge-hi);
}
.nv-bar{
  position:absolute;left:50%;top:50%;width:1rem;height:2px;margin:-1px 0 0 -.5rem;border-radius:2px;
  background:currentColor;transition:transform .35s cubic-bezier(.22,1,.36,1),opacity .2s ease;
}
.nv-bar:nth-child(1){transform:translateY(-5px)}
.nv-bar:nth-child(3){transform:translateY(5px)}
.nv-burger[aria-expanded="true"] .nv-bar:nth-child(1){transform:rotate(45deg)}
.nv-burger[aria-expanded="true"] .nv-bar:nth-child(2){opacity:0;transform:scaleX(.2)}
.nv-burger[aria-expanded="true"] .nv-bar:nth-child(3){transform:rotate(-45deg)}

/* mobile panel */
.nv-drop{animation:nv-drop .28s cubic-bezier(.22,1,.36,1) both;transform-origin:top center}
@keyframes nv-drop{from{opacity:0;transform:translateY(-8px) scale(.98)}to{opacity:1;transform:none}}
.nv-mactive{
  background:linear-gradient(180deg,var(--nv-pill-top),var(--nv-pill-bot));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.4);border:1px solid var(--nv-pill-edge);
}
.nv-dot{width:.45rem;height:.45rem;border-radius:9999px;background:var(--nv-accent);box-shadow:0 0 10px var(--nv-cta-glow)}

.nv-root a:focus-visible,.nv-root button:focus-visible{outline:2px solid var(--nv-accent);outline-offset:2px}

@media (prefers-reduced-motion:reduce){
  .nv-shell::after{animation:none;opacity:0}
  .nv-pill,.nv-pill[data-ready="true"],.nv-cta,.nv-cta::after,.nv-logo,.nv-bar{transition:none}
  .nv-drop{animation:none}
}
`;

const Arrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState(null);
  const [pill, setPill] = useState({ x: 0, w: 0, show: false, ready: false });

  const { pathname } = useLocation();
  const itemRefs = useRef([]);

  const activeIdx = links.findIndex((l) =>
    l.to === "/" ? pathname === "/" : pathname.startsWith(l.to),
  );
  const target = hover ?? activeIdx;

  // shrink + deepen the shadow after the page scrolls a little
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // close mobile menu on route change and on Escape
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // position the gliding pill under the hovered / active link
  useLayoutEffect(() => {
    const place = () => {
      const el = itemRefs.current[target];
      if (!el || target < 0) {
        setPill((p) => ({ ...p, show: false }));
        return;
      }
      setPill((p) => ({
        x: el.offsetLeft,
        w: el.offsetWidth,
        show: true,
        ready: p.ready,
      }));
    };
    place();
    window.addEventListener("resize", place);
    document.fonts?.ready?.then(place);
    return () => window.removeEventListener("resize", place);
  }, [target]);

  // turn transitions on only after the first placement (no slide-in on load)
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      setPill((p) => (p.ready ? p : { ...p, ready: true })),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  const linkCls = ({ isActive }) =>
    `relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-fg" : "text-fg/60 hover:text-fg"
    }`;

  return (
    <header
      className={`nv-root fixed inset-x-0 top-0 z-50 px-4 transition-[padding] duration-300 ${
        scrolled ? "pt-2" : "pt-4"
      }`}
    >
      <style>{css}</style>

      <nav
        data-scrolled={scrolled}
        className={`nv-shell mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 sm:px-4 ${
          scrolled ? "py-1.5" : "py-2.5"
        }`}
      >
        <Link
          to="/"
          className="nv-logo"
          aria-label="Home"
          onClick={() => setOpen(false)}
        >
          <img
            src={logo}
            alt="Portfolio Logo"
            className={`rounded-full bg-white/60 object-cover transition-all duration-300 ${
              scrolled ? "h-10 w-10" : "h-12 w-12"
            }`}
          />
        </Link>

        {/* desktop links */}
        <div
          className="relative hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHover(null)}
          onBlur={() => setHover(null)}
        >
          <span
            aria-hidden="true"
            className="nv-pill"
            data-ready={pill.ready}
            style={{
              width: pill.w,
              transform: `translateX(${pill.x}px)`,
              opacity: pill.show ? 1 : 0,
            }}
          />
          {links.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={linkCls}
              ref={(el) => (itemRefs.current[i] = el)}
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link to="/contact" className="nv-cta hidden md:inline-flex">
            <span>Hire me</span>
            <Arrow />
          </Link>

          <button
            className="nv-burger text-fg md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="nv-bar" />
            <span className="nv-bar" />
            <span className="nv-bar" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="nv-glass nv-drop mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-3xl p-3 md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-base transition-colors ${
                  isActive
                    ? "nv-mactive font-medium text-fg"
                    : "text-fg/70 active:bg-fg/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{l.label}</span>
                  {isActive && <span className="nv-dot" aria-hidden="true" />}
                </>
              )}
            </NavLink>
          ))}

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="nv-cta mt-2 justify-center !py-3"
          >
            <span>Hire me</span>
            <Arrow />
          </Link>
        </div>
      )}
    </header>
  );
}
