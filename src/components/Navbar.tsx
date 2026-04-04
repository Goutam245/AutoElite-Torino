import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const links = [
  { to: "/", label: "Home" },
  { to: "/fleet", label: "Fleet" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
      style={scrolled ? { background: "rgba(10,10,11,0.95)" } : undefined}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
            <span className="text-primary font-display text-lg font-bold"><img src="1.png" alt="" /> </span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-[15px] font-semibold tracking-wide text-foreground">
              AUTO<span className="text-primary">ELITE</span>
            </span>
            <span className="text-[9px] font-heading tracking-[0.25em] text-muted-foreground uppercase">
              Torino
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const isActive = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-4 py-2 text-[13px] font-heading font-medium tracking-wide rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-primary bg-primary/8"
                    : "text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+390111234567"
            className="flex items-center gap-2 text-[12px] text-muted-foreground hover:text-foreground font-heading font-medium transition-colors duration-300"
          >
            <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center">
              <Phone size={12} className="text-primary" />
            </div>
            +39 011 123 4567
          </a>
          <Link
            to="/contact"
            className="btn-gold-solid text-[12px] px-6 py-2.5 flex items-center gap-1.5"
          >
            Book Now
            <ChevronRight size={13} />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-foreground/5 border border-border text-foreground z-50 transition-colors hover:bg-foreground/10"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-background/98 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-6 lg:hidden"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={l.to}
                  className={`font-heading text-2xl font-light tracking-wide transition-colors ${
                    location.pathname === l.to
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <div className="h-px w-16 bg-primary/20 my-2" />
            <Link to="/contact" className="btn-gold-solid text-sm px-8 py-3">
              Book Now
            </Link>
            <a
              href="tel:+390111234567"
              className="flex items-center gap-2 text-sm text-muted-foreground font-heading"
            >
              <Phone size={14} className="text-primary" /> +39 011 123 4567
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
