import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Sparkles,
  Waves,
  Dumbbell,
  Compass,
  Target,
  MapPin,
  Camera,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Quote,
  Check,
  ShieldCheck,
  Clock,
  Mail,
  Phone,
  ChevronDown,
} from "lucide-react";

import heroStudio from "./images/Current uniform 🤎 @wiskiiactive A good Pilates session + a matching set = instant mood boost. U.jpg";
import heroSecondary from "./images/Current uniform 🤎 @wiskiiactive A good Pilates session + a matching set = instant mood boost. U (1).jpg";
import reformerCloseup from "./images/Current uniform 🤎 @wiskiiactive A good Pilates session + a matching set = instant mood boost. U (2).jpg";
import reformerDetail from "./images/Join me @alignstudiomiami inside @wynwoodpadelclubofficial ✨ this Saturday, June 28 at 10-30 AM!.jpg";
import eventPhoto from "./images/Our first event ever and it was everything✨ Thank you to everyone who came out and made it so sp.jpg";
import eventPhotoAlt from "./images/Our first event ever and it was everything✨ Thank you to everyone who came out and made it so sp (1).jpg";
import studioPhoto from "./images/Catch me @themostmiami 🤍 your newest studio in Brickell Key✨➡️Thursday’s 8-30am Classical Barre.jpg";

const SITE_ASSETS = {
  /* ------------------------------------------------------------------
   * HERO / EDITORIAL
   * ------------------------------------------------------------------ */
  heroStudio,
  heroSecondary,

  /* ------------------------------------------------------------------
   * 1:1 PRIVATE REFORMER CLOSE-UPS
   * ------------------------------------------------------------------ */
  reformerCloseup,
  reformerDetail,
  coreWork: heroSecondary,

  /* ------------------------------------------------------------------
   * THE STUDIO EXPERIENCE HUB
   * ------------------------------------------------------------------ */
  studioSpace: studioPhoto,
  studioDetail: eventPhoto,
  studioEquipment: eventPhotoAlt,

  /* ------------------------------------------------------------------
   * CLUB STUDIO / THE MOST / BODYROK — RESIDENCY CAPTURES
   * ------------------------------------------------------------------ */
  residencyClubStudio: reformerDetail,
  residencyTheMost: studioPhoto,
  residencyBodyrok: eventPhoto,

  /* ------------------------------------------------------------------
   * CLIENT PROFILE HEADSHOTS
   * ------------------------------------------------------------------ */
  clientHeadshots: [
    heroStudio,
    reformerCloseup,
    studioPhoto,
    eventPhotoAlt,
  ],
};

/* ====================================================================
 * DESIGN TOKENS
 * ================================================================== */
const EASE = [0.22, 1, 0.36, 1];

const INK = "#1C1A17";
const CANVAS = "#FBFBF9";
const GOLD = "#D4AF37";

/* ====================================================================
 * GLOBAL STYLES (fonts, resets, premium scrollbar)
 * ================================================================== */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');

    :root {
      --canvas: #FBFBF9;
      --ink: #1C1A17;
      --gold: #D4AF37;
    }

    html {
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      background-color: #FBFBF9;
      color: #1C1A17;
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      overflow-x: hidden;
    }

    .font-display {
      font-family: 'Cormorant Garamond', 'Playfair Display', ui-serif, Georgia, serif;
      font-feature-settings: "liga" 1, "dlig" 1;
    }

    .font-body {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
    }

    ::selection {
      background: #D4AF37;
      color: #1C1A17;
    }

    ::-webkit-scrollbar { width: 9px; }
    ::-webkit-scrollbar-track { background: #F2F1EC; }
    ::-webkit-scrollbar-thumb {
      background: #D8D5CC;
      border-radius: 999px;
    }
    ::-webkit-scrollbar-thumb:hover { background: #D4AF37; }

    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    .text-balance { text-wrap: balance; }

    /* Fine luxury hairline */
    .hairline { border-color: rgba(28, 26, 23, 0.10); }
  `}</style>
);

/* ====================================================================
 * REUSABLE MOTION PRIMITIVE
 * ================================================================== */
const Reveal = ({ children, delay = 0, y = 30, className = "", once = true }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: "-70px" }}
    transition={{ duration: 0.95, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

/* ====================================================================
 * SECTION EYEBROW
 * ================================================================== */
const Eyebrow = ({ children, className = "" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <span className="h-px w-8 bg-[#D4AF37]" />
    <span className="font-body text-[10px] font-medium uppercase tracking-[0.34em] text-[#D4AF37]">
      {children}
    </span>
  </div>
);

/* ====================================================================
 * PRIMARY CTA — fluid gold expansion on hover
 * ================================================================== */
const PrimaryCTA = ({ href = "#inquire", children, className = "", icon = true }) => (
  <a
    href={href}
    className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#1C1A17] px-8 py-4 font-body text-[10.5px] font-medium uppercase tracking-[0.24em] text-[#FBFBF9] transition-transform duration-500 hover:-translate-y-0.5 ${className}`}
  >
    <span className="absolute inset-0 z-0 translate-y-full bg-[#D4AF37] transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
    <span className="relative z-10 transition-colors duration-500 group-hover:text-[#1C1A17]">
      {children}
    </span>
    {icon && (
      <ArrowRight
        className="relative z-10 h-3.5 w-3.5 transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#1C1A17]"
        strokeWidth={1.6}
      />
    )}
  </a>
);

/* ====================================================================
 * SECONDARY CTA — outlined, ink fill on hover
 * ================================================================== */
const SecondaryCTA = ({ href = "#schedule", children, className = "" }) => (
  <a
    href={href}
    className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-[#1C1A17]/20 px-8 py-4 font-body text-[10.5px] font-medium uppercase tracking-[0.24em] text-[#1C1A17] transition-colors duration-500 hover:border-[#1C1A17] ${className}`}
  >
    <span className="absolute inset-0 z-0 translate-y-full bg-[#1C1A17] transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
    <span className="relative z-10 transition-colors duration-500 group-hover:text-[#FBFBF9]">
      {children}
    </span>
  </a>
);

/* ====================================================================
 * NAVIGATION
 * ================================================================== */
const NAV_LINKS = [
  { label: "The Studio", href: "#studio" },
  { label: "1:1 Method", href: "#method" },
  { label: "Schedule", href: "#schedule" },
  { label: "Inquire", href: "#inquire" },
];

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5"
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-5 py-3 transition-all duration-700 sm:px-7 sm:py-3.5 ${
            scrolled
              ? "border-[#1C1A17]/10 bg-[#FBFBF9]/80 shadow-[0_10px_40px_-18px_rgba(28,26,23,0.22)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          {/* Logo */}
          <a
            href="#top"
            className="group flex flex-col leading-none"
            aria-label="Method by STAS — home"
          >
            <span className="font-display text-[19px] font-semibold tracking-[0.13em] text-[#1C1A17] sm:text-[21px]">
              METHOD <span className="text-[#D4AF37]">BY</span> STAS
            </span>
            <span className="mt-1 hidden font-body text-[8px] font-medium uppercase tracking-[0.42em] text-[#1C1A17]/45 sm:block">
              Brickell · Miami
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative font-body text-[11px] font-medium uppercase tracking-[0.2em] text-[#1C1A17]/70 transition-colors duration-300 hover:text-[#1C1A17]"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#D4AF37] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#inquire"
              className="group relative hidden overflow-hidden rounded-full bg-[#1C1A17] px-6 py-3 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-[#FBFBF9] transition-transform duration-500 hover:-translate-y-0.5 sm:inline-flex"
            >
              <span className="absolute inset-0 z-0 translate-y-full bg-[#D4AF37] transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-[#1C1A17]">
                Book Private Studio
              </span>
            </a>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#1C1A17]/12 bg-[#FBFBF9]/70 backdrop-blur-md transition-colors duration-300 hover:border-[#D4AF37] lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <motion.span
                  animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute left-0 top-0 block h-px w-5 origin-center bg-[#1C1A17]"
                />
                <motion.span
                  animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="absolute left-0 top-1.5 block h-px w-5 bg-[#1C1A17]"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute left-0 top-3 block h-px w-5 origin-center bg-[#1C1A17]"
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-[#FBFBF9]/95 backdrop-blur-2xl" />
            <div className="relative flex h-full flex-col justify-center px-8 sm:px-14">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 14 }}
                    transition={{ duration: 0.6, delay: 0.08 + i * 0.07, ease: EASE }}
                    className="group flex items-baseline justify-between border-b border-[#1C1A17]/8 py-5"
                  >
                    <span className="font-display text-[34px] font-light leading-none tracking-tight text-[#1C1A17] transition-colors duration-300 group-hover:text-[#D4AF37] sm:text-[42px]">
                      {link.label}
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-[#1C1A17]/25 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#D4AF37]"
                      strokeWidth={1.3}
                    />
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                className="mt-10 flex flex-col gap-4"
              >
                <PrimaryCTA href="#inquire" className="w-full">
                  Book Private Studio
                </PrimaryCTA>
                <div className="flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.28em] text-[#1C1A17]/45">
                  <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" strokeWidth={1.5} />
                  Brickell, Miami · FL
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ====================================================================
 * HERO
 * ================================================================== */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden bg-[#FBFBF9] px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:pb-28 lg:pt-44"
    >
      {/* soft ambient luxury glow */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-[#D4AF37]/8 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[440px] w-[440px] rounded-full bg-[#1C1A17]/5 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        {/* ---------------- COPY ---------------- */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          >
            <Eyebrow>Brickell, Miami — Private 1:1 Reformer Studio</Eyebrow>
          </motion.div>

          <h1 className="mt-7 font-display text-[42px] font-light leading-[1.02] tracking-[-0.02em] text-[#1C1A17] sm:text-[58px] lg:text-[68px] xl:text-[76px]">
            {["Form.", "Technique.", "Core Stability."].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.32 + i * 0.1 }}
                className="block"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.62 }}
              className="mt-3 block text-[27px] font-light italic leading-[1.18] text-[#1C1A17]/80 sm:text-[34px] lg:text-[38px]"
            >
              Private 1:1 Pilates in Brickell.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.78 }}
            className="mt-8 max-w-[520px] font-body text-[14.5px] font-light leading-[1.85] text-[#1C1A17]/62"
          >
            An exclusive private Transformer studio founded by{" "}
            <span className="font-medium text-[#1C1A17]">Anastasia Wagner</span>. Every
            session is a fully bespoke, hyper-focused hour built around your
            biomechanics — refining alignment, rebuilding deep core strength, and
            sculpting elite athletic precision. One client. One instructor. One studio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.92 }}
            className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:items-center"
          >
            <PrimaryCTA href="#inquire">Apply for 1:1 Private Studio</PrimaryCTA>
            <SecondaryCTA href="#schedule">View Class Schedules</SecondaryCTA>
          </motion.div>

          {/* micro credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.1 }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-[#1C1A17]/10 pt-7"
          >
            {[
              { k: "1:1", v: "Private Only" },
              { k: "60′", v: "Bespoke Session" },
              { k: "100%", v: "Undivided Focus" },
            ].map((s) => (
              <div key={s.k}>
                <div className="font-display text-[26px] font-light leading-none text-[#1C1A17]">
                  {s.k}
                </div>
                <div className="mt-2 font-body text-[9.5px] font-medium uppercase tracking-[0.2em] text-[#1C1A17]/42">
                  {s.v}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ---------------- IMAGERY ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px] bg-[#EFEDE7]">
            <motion.img
              style={{ y: imgY }}
              src={SITE_ASSETS.heroStudio}
              alt="Private 1:1 reformer studio in Brickell, Miami"
              loading="eager"
              className="absolute inset-0 h-[118%] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/28 via-transparent to-transparent" />

            {/* gold hairline frame */}
            <div className="pointer-events-none absolute inset-4 border border-[#FBFBF9]/25" />
          </div>

          {/* floating glass credential card */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1 }}
            className="absolute -bottom-6 -left-3 w-[248px] rounded-[2px] border border-[#D4AF37]/35 bg-[#F5F4EF]/95 p-5 shadow-[0_26px_60px_-30px_rgba(28,26,23,0.45)] backdrop-blur-2xl sm:-left-8 sm:w-[276px]"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" strokeWidth={1.5} />
              <span className="font-body text-[9px] font-medium uppercase tracking-[0.28em] text-[#1C1A17]/70">
                The STAS Standard
              </span>
            </div>
            <p className="mt-3 font-display text-[17px] font-light leading-[1.45] text-[#1C1A17]">
              “Precision over repetition. Form before fatigue.”
            </p>
            <div className="mt-4 flex items-center gap-3 border-t border-[#1C1A17]/15 pt-3.5">
              <img
                src={SITE_ASSETS.clientHeadshots[0]}
                alt="Client portrait"
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="font-body text-[9.5px] uppercase tracking-[0.18em] text-[#1C1A17]/65">
                Anastasia Wagner · Founder
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ====================================================================
 * ELITE AUTHORITY / PLACEMENT STRIP
 * ================================================================== */
function PlacementStrip() {
  const items = [
    { icon: MapPin, label: "Private Studio", value: "Brickell" },
    { icon: Compass, label: "Find Me At", value: "Club Studio Fitness" },
    { icon: Sparkles, label: "Residency", value: "The Most Miami" },
    { icon: Target, label: "Residency", value: "Bodyrok" },
  ];

  return (
    <section className="relative border-y border-[#1C1A17]/10 bg-[#F5F4EF]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 divide-y divide-[#1C1A17]/8 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {items.map((item, i) => (
            <Reveal
              key={item.value}
              delay={i * 0.08}
              y={18}
              className={`flex items-center gap-4 py-6 lg:px-8 ${
                i === 0 ? "lg:pl-0" : ""
              } ${i % 2 === 1 ? "sm:border-l sm:border-[#1C1A17]/8 sm:pl-8" : ""} ${
                i >= 2 ? "sm:border-t sm:border-[#1C1A17]/8 lg:border-t-0" : ""
              }`}
            >
              <item.icon
                className="h-4 w-4 shrink-0 text-[#D4AF37]"
                strokeWidth={1.4}
              />
              <div className="min-w-0">
                <div className="font-body text-[8.5px] font-medium uppercase tracking-[0.3em] text-[#1C1A17]/40">
                  {item.label}
                </div>
                <div className="mt-1 truncate font-display text-[17px] font-normal tracking-wide text-[#1C1A17]">
                  {item.value}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
 * THE STAS PILLARS OF FORM
 * ================================================================== */
const PILLARS = [
  {
    number: "01",
    icon: Compass,
    title: "Precision Biomechanics",
    copy: "Flawless, hands-on form adjustment at every joint. Each repetition is mapped to your individual structure, range, and alignment — so the work lands exactly where it should.",
    points: ["Joint-by-joint alignment", "Real-time hands-on cueing", "Postural correction"],
  },
  {
    number: "02",
    icon: Waves,
    title: "Deep Core Stability",
    copy: "Reforming foundation strength from the inside out. We rebuild the transverse abdominis, pelvic floor, and deep spinal stabilisers that hold elite posture together.",
    points: ["Transverse abdominis activation", "Pelvic & spinal stability", "Breath-led control"],
  },
  {
    number: "03",
    icon: Dumbbell,
    title: "Private 1:1 Alchemy",
    copy: "Complete hyper-focused attention, every single session. No shared equipment, no split attention — just you, the reformer, and a method built entirely around your progress.",
    points: ["Entire studio to yourself", "Fully bespoke programming", "Progress tracked session to session"],
  },
];

function Pillars() {
  return (
    <section
      id="method"
      className="relative scroll-mt-24 bg-[#FBFBF9] px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-end lg:gap-16">
          <Reveal>
            <Eyebrow>The STAS Pillars of Form</Eyebrow>
            <h2 className="mt-6 font-display text-[36px] font-light leading-[1.08] tracking-[-0.015em] text-[#1C1A17] sm:text-[46px] lg:text-[52px]">
              Three principles.
              <br />
              <span className="italic text-[#1C1A17]/72">Zero compromise.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="font-body text-[14px] font-light leading-[1.85] text-[#1C1A17]/60 lg:pb-3">
              Method by STAS is not a class. It is a private practice built on the belief
              that real transformation happens when nothing is rushed, nothing is
              generic, and nothing is shared. These are the foundations every session
              is engineered around.
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3 lg:gap-7">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.13} y={40}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="group relative flex h-full flex-col overflow-hidden rounded-[3px] border border-[#1C1A17]/10 bg-[#FBFBF9] p-8 shadow-[0_18px_50px_-38px_rgba(28,26,23,0.4)] transition-shadow duration-500 hover:shadow-[0_34px_70px_-40px_rgba(28,26,23,0.45)] lg:p-9"
              >
                {/* gold top rule that grows */}
                <span className="absolute left-0 top-0 h-px w-0 bg-[#D4AF37] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />

                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1C1A17]/10 bg-[#F5F4EF] transition-colors duration-500 group-hover:border-[#D4AF37]/50 group-hover:bg-[#D4AF37]/10">
                    <pillar.icon
                      className="h-[18px] w-[18px] text-[#1C1A17] transition-colors duration-500 group-hover:text-[#D4AF37]"
                      strokeWidth={1.35}
                    />
                  </div>
                  <span className="font-display text-[13px] tracking-[0.2em] text-[#1C1A17]/25">
                    {pillar.number}
                  </span>
                </div>

                <h3 className="mt-8 font-display text-[25px] font-normal leading-tight tracking-[-0.01em] text-[#1C1A17]">
                  {pillar.title}
                </h3>

                <p className="mt-4 font-body text-[13.5px] font-light leading-[1.85] text-[#1C1A17]/58">
                  {pillar.copy}
                </p>

                <ul className="mt-7 space-y-2.5 border-t border-[#1C1A17]/8 pt-6">
                  {pillar.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <Check
                        className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[#D4AF37]"
                        strokeWidth={2}
                      />
                      <span className="font-body text-[11.5px] font-light tracking-wide text-[#1C1A17]/68">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
 * THE STUDIO EXPERIENCE HUB
 * ================================================================== */
function StudioExperience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bigY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const smallY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  const features = [
    {
      icon: ShieldCheck,
      title: "Total Privacy",
      copy: "The studio is yours alone. No other clients, no observers, no interruptions — a completely closed-door environment.",
    },
    {
      icon: Target,
      title: "Custom Equipment Setup",
      copy: "Your Transformer is configured to your height, limb length, and spring tension before you arrive.",
    },
    {
      icon: Sparkles,
      title: "Exclusive Atmosphere",
      copy: "Soft daylight, warm neutral tones, and a calm, spa-grade interior designed to make focus effortless.",
    },
  ];

  return (
    <section
      id="studio"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden bg-[#F5F4EF] px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.02fr] lg:items-center lg:gap-20">
          {/* Imagery collage */}
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-5 grid-rows-6 gap-3.5 sm:gap-4">
              <div className="col-span-5 row-span-4 overflow-hidden rounded-[3px] bg-[#E9E7E0]">
                <motion.img
                  style={{ y: bigY }}
                  src={SITE_ASSETS.studioSpace}
                  alt="The private Method by STAS studio space in Brickell"
                  loading="lazy"
                  className="h-[116%] w-full object-cover"
                />
              </div>
              <div className="col-span-3 row-span-2 overflow-hidden rounded-[3px] bg-[#E9E7E0]">
                <motion.img
                  style={{ y: smallY }}
                  src={SITE_ASSETS.reformerCloseup}
                  alt="Private reformer close-up detail"
                  loading="lazy"
                  className="h-[112%] w-full object-cover"
                />
              </div>
              <div className="col-span-2 row-span-2 overflow-hidden rounded-[3px] bg-[#E9E7E0]">
                <motion.img
                  style={{ y: smallY }}
                  src={SITE_ASSETS.studioEquipment}
                  alt="Custom configured pilates equipment"
                  loading="lazy"
                  className="h-[112%] w-full object-cover"
                />
              </div>
            </div>

            {/* floating stat chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
              className="absolute -right-2 top-6 rounded-full border border-[#1C1A17]/8 bg-[#FBFBF9]/80 px-5 py-3 shadow-[0_18px_44px_-26px_rgba(28,26,23,0.4)] backdrop-blur-xl sm:-right-5"
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4AF37]" />
                </span>
                <span className="font-body text-[9.5px] font-medium uppercase tracking-[0.24em] text-[#1C1A17]/62">
                  Now Accepting 1:1
                </span>
              </div>
            </motion.div>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow>The Studio Experience</Eyebrow>
              <h2 className="mt-6 font-display text-[36px] font-light leading-[1.08] tracking-[-0.015em] text-[#1C1A17] sm:text-[46px] lg:text-[52px]">
                An entire studio,
                <br />
                <span className="italic text-[#1C1A17]/72">reserved for one.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-[540px] font-body text-[14px] font-light leading-[1.9] text-[#1C1A17]/60">
                Tucked into the heart of Brickell, the Method by STAS private studio was
                designed around a single idea: that elite movement work requires
                undivided space. Clients have the entire studio and the full attention
                of their instructor — from the first breath to the final release.
              </p>
            </Reveal>

            <div className="mt-11 space-y-7">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={0.2 + i * 0.1}>
                  <div className="group flex gap-5">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1C1A17]/10 bg-[#FBFBF9] transition-colors duration-500 group-hover:border-[#D4AF37]/50 group-hover:bg-[#D4AF37]/10">
                      <f.icon
                        className="h-4 w-4 text-[#1C1A17] transition-colors duration-500 group-hover:text-[#D4AF37]"
                        strokeWidth={1.4}
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-[20px] font-normal tracking-[-0.005em] text-[#1C1A17]">
                        {f.title}
                      </h3>
                      <p className="mt-2 max-w-[440px] font-body text-[13px] font-light leading-[1.8] text-[#1C1A17]/56">
                        {f.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.5} className="mt-12">
              <PrimaryCTA href="#inquire">Request Studio Access</PrimaryCTA>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
 * RESIDENCIES & PUBLIC SCHEDULE
 * ================================================================== */
const RESIDENCIES = [
  {
    name: "Club Studio Fitness",
    city: "Brickell, Miami",
    tag: "Weekly Residency",
    image: SITE_ASSETS.residencyClubStudio,
    note: "Signature reformer classes — limited capacity.",
  },
  {
    name: "The Most Miami",
    city: "Miami, FL",
    tag: "Guest Instructor",
    image: SITE_ASSETS.residencyTheMost,
    note: "High-intensity sculpt & core programming.",
  },
  {
    name: "Bodyrok",
    city: "Miami, FL",
    tag: "Reformer Residency",
    image: SITE_ASSETS.residencyBodyrok,
    note: "Signature STAS form-focused sequences.",
  },
];

function Residencies() {
  return (
    <section
      id="schedule"
      className="relative scroll-mt-24 bg-[#FBFBF9] px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <Eyebrow>Residencies & Public Schedule</Eyebrow>
            <h2 className="mt-6 max-w-[560px] font-display text-[36px] font-light leading-[1.08] tracking-[-0.015em] text-[#1C1A17] sm:text-[46px] lg:text-[52px]">
              Train with STAS
              <span className="italic text-[#1C1A17]/72"> across Miami.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-[340px] font-body text-[13px] font-light leading-[1.85] text-[#1C1A17]/55">
              Beyond the private studio, Anastasia holds weekly residencies at Miami's
              most sought-after studios. Enquire for the current timetable and waitlist.
            </p>
          </Reveal>
        </div>

        {/* Cards — snap slider on mobile, grid on desktop */}
        <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:gap-7 lg:overflow-visible lg:pb-0">
          {RESIDENCIES.map((r, i) => (
            <Reveal
              key={r.name}
              delay={i * 0.12}
              y={40}
              className="min-w-[80%] snap-start sm:min-w-[58%] lg:min-w-0"
            >
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="group relative h-full overflow-hidden rounded-[3px] border border-[#1C1A17]/10 bg-[#FBFBF9] shadow-[0_18px_50px_-40px_rgba(28,26,23,0.45)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#E9E7E0]">
                  <img
                    src={r.image}
                    alt={`${r.name} residency`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/45 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-[#FBFBF9]/30 bg-[#FBFBF9]/18 px-3.5 py-1.5 font-body text-[8.5px] font-medium uppercase tracking-[0.24em] text-[#FBFBF9] backdrop-blur-md">
                    {r.tag}
                  </span>
                </div>

                <div className="p-7">
                  <h3 className="font-display text-[23px] font-normal tracking-[-0.005em] text-[#1C1A17]">
                    {r.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" strokeWidth={1.5} />
                    <span className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-[#1C1A17]/45">
                      {r.city}
                    </span>
                  </div>
                  <p className="mt-4 font-body text-[12.5px] font-light leading-[1.8] text-[#1C1A17]/58">
                    {r.note}
                  </p>

                  <a
                    href="#inquire"
                    className="mt-6 inline-flex items-center gap-2 font-body text-[10px] font-medium uppercase tracking-[0.22em] text-[#1C1A17] transition-colors duration-300 hover:text-[#D4AF37]"
                  >
                    Enquire for Schedule
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.6}
                    />
                  </a>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
 * THE MOVEMENT TESTIMONIALS
 * ================================================================== */
const TESTIMONIALS = [
  {
    quote:
      "Six months in and my posture has completely reorganised. I stand differently, I sit differently — people notice before I even say a word about pilates.",
    name: "Elena Marchetti",
    role: "Creative Director · Design District",
    image: SITE_ASSETS.clientHeadshots[0],
    metric: "Postural Transformation",
  },
  {
    quote:
      "I came in with chronic lower-back tension from years at a desk. Anastasia rebuilt my core from the ground up. I haven't had a flare-up since week three.",
    name: "Marcus Reyes",
    role: "Partner · Brickell Law Firm",
    image: SITE_ASSETS.clientHeadshots[3],
    metric: "Core Rebuilding",
  },
  {
    quote:
      "The energy shift is unreal. One private hour with STAS does more for me than three group classes ever did. It's the most efficient hour of my entire week.",
    name: "Sofia Lindqvist",
    role: "Founder · Miami Tech",
    image: SITE_ASSETS.clientHeadshots[1],
    metric: "Energy & Focus",
  },
  {
    quote:
      "As a former dancer, I'm brutally particular about form. Anastasia is the only instructor in Miami whose eye I fully trust. Every cue is exact.",
    name: "Camille Dubois",
    role: "Former Principal Dancer",
    image: SITE_ASSETS.clientHeadshots[2],
    metric: "Athletic Refinement",
  },
];

function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#F5F4EF] px-5 py-24 sm:px-8 lg:py-32">
      <div className="pointer-events-none absolute -right-40 top-0 h-[460px] w-[460px] rounded-full bg-[#D4AF37]/8 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <Eyebrow>The Movement Testimonials</Eyebrow>
            <h2 className="mt-6 max-w-[600px] font-display text-[36px] font-light leading-[1.08] tracking-[-0.015em] text-[#1C1A17] sm:text-[46px] lg:text-[52px]">
              Results that speak
              <span className="italic text-[#1C1A17]/72"> in posture.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex items-center gap-3 lg:pb-3">
              <div className="flex -space-x-3">
                {SITE_ASSETS.clientHeadshots.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-9 w-9 rounded-full border-2 border-[#F5F4EF] object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-[#1C1A17]/60">
                  Private Clients
                </div>
                <div className="font-display text-[15px] text-[#1C1A17]">
                  Brickell & Beyond
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Sliding cards — horizontal snap on mobile, 2-col grid on desktop */}
        <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 lg:grid lg:grid-cols-2 lg:gap-7 lg:overflow-visible lg:pb-0">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.1}
              y={40}
              className="min-w-[86%] snap-start sm:min-w-[62%] lg:min-w-0"
            >
              <motion.figure
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[3px] border border-[#1C1A17]/10 bg-[#FBFBF9]/85 p-8 backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_30px_70px_-45px_rgba(28,26,23,0.5)] lg:p-9"
              >
                <span className="absolute left-0 top-0 h-px w-0 bg-[#D4AF37] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />

                <div>
                  <div className="flex items-center justify-between">
                    <Quote
                      className="h-6 w-6 text-[#D4AF37]/55"
                      strokeWidth={1.2}
                    />
                    <span className="font-body text-[8.5px] font-medium uppercase tracking-[0.26em] text-[#1C1A17]/35">
                      {t.metric}
                    </span>
                  </div>

                  <blockquote className="mt-6 font-display text-[20px] font-light leading-[1.55] tracking-[-0.005em] text-[#1C1A17]/88 sm:text-[22px]">
                    “{t.quote}”
                  </blockquote>
                </div>

                <figcaption className="mt-8 flex items-center gap-4 border-t border-[#1C1A17]/8 pt-6">
                  <img
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-display text-[16px] tracking-wide text-[#1C1A17]">
                      {t.name}
                    </div>
                    <div className="mt-0.5 font-body text-[9.5px] font-medium uppercase tracking-[0.2em] text-[#1C1A17]/42">
                      {t.role}
                    </div>
                  </div>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
 * PRIVATE CONSULTATION INTAKE
 * ================================================================== */
const SLOTS = ["Early Morning", "Midday", "Afternoon", "Evening", "Weekend"];
const LEVELS = [
  "Complete Beginner",
  "Some Reformer Experience",
  "Intermediate",
  "Advanced / Athlete",
];

function Intake() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    level: "",
    goal: "",
    slot: "",
  });
  const [focused, setFocused] = useState(null);

  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputBase =
    "w-full rounded-[2px] border bg-[#FBFBF9]/70 px-4 py-3.5 font-body text-[13px] font-light text-[#1C1A17] placeholder:text-[#1C1A17]/28 outline-none transition-all duration-400";

  const borderFor = (key) =>
    focused === key
      ? "border-[#D4AF37] ring-4 ring-[#D4AF37]/10"
      : "border-[#1C1A17]/12 hover:border-[#1C1A17]/25";

  return (
    <section
      id="inquire"
      className="relative scroll-mt-24 overflow-hidden bg-[#FBFBF9] px-5 py-24 sm:px-8 lg:py-32"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[#D4AF37]/7 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center">
          <div className="flex justify-center">
            <Eyebrow>Private Consultation Intake</Eyebrow>
          </div>
          <h2 className="mt-6 font-display text-[36px] font-light leading-[1.08] tracking-[-0.015em] text-[#1C1A17] sm:text-[46px] lg:text-[54px]">
            Apply for your
            <span className="italic text-[#1C1A17]/72"> private studio.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] font-body text-[14px] font-light leading-[1.85] text-[#1C1A17]/58">
            Private 1:1 availability is intentionally limited. Share a little about your
            goals and Anastasia will personally reach out to arrange your consultation.
          </p>
        </Reveal>

        <Reveal delay={0.15} y={44} className="mt-14">
          <div className="relative overflow-hidden rounded-[3px] border border-[#1C1A17]/10 bg-[#FBFBF9]/72 p-7 shadow-[0_40px_100px_-60px_rgba(28,26,23,0.55)] backdrop-blur-2xl sm:p-10 lg:p-14">
            {/* gold corner accents */}
            <span className="pointer-events-none absolute left-0 top-0 h-14 w-14 border-l border-t border-[#D4AF37]/45" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-14 w-14 border-b border-r border-[#D4AF37]/45" />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  onSubmit={handleSubmit}
                  className="relative"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Name */}
                    <div className="sm:col-span-1">
                      <label className="mb-2.5 block font-body text-[9.5px] font-medium uppercase tracking-[0.26em] text-[#1C1A17]/50">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={update("name")}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        placeholder="Anastasia Wagner"
                        className={`${inputBase} ${borderFor("name")}`}
                      />
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-1">
                      <label className="mb-2.5 block font-body text-[9.5px] font-medium uppercase tracking-[0.26em] text-[#1C1A17]/50">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        placeholder="you@email.com"
                        className={`${inputBase} ${borderFor("email")}`}
                      />
                    </div>

                    {/* Phone */}
                    <div className="sm:col-span-1">
                      <label className="mb-2.5 block font-body text-[9.5px] font-medium uppercase tracking-[0.26em] text-[#1C1A17]/50">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={update("phone")}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused(null)}
                        placeholder="+1 (305) 000-0000"
                        className={`${inputBase} ${borderFor("phone")}`}
                      />
                    </div>

                    {/* Experience level */}
                    <div className="sm:col-span-1">
                      <label className="mb-2.5 block font-body text-[9.5px] font-medium uppercase tracking-[0.26em] text-[#1C1A17]/50">
                        Experience Level
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={form.level}
                          onChange={update("level")}
                          onFocus={() => setFocused("level")}
                          onBlur={() => setFocused(null)}
                          className={`${inputBase} ${borderFor(
                            "level"
                          )} cursor-pointer appearance-none pr-11 ${
                            form.level ? "" : "text-[#1C1A17]/30"
                          }`}
                        >
                          <option value="" disabled>
                            Select your level
                          </option>
                          {LEVELS.map((lvl) => (
                            <option key={lvl} value={lvl} className="text-[#1C1A17]">
                              {lvl}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1C1A17]/40"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    {/* Goals */}
                    <div className="sm:col-span-2">
                      <label className="mb-2.5 block font-body text-[9.5px] font-medium uppercase tracking-[0.26em] text-[#1C1A17]/50">
                        Your Primary Goals
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.goal}
                        onChange={update("goal")}
                        onFocus={() => setFocused("goal")}
                        onBlur={() => setFocused(null)}
                        placeholder="Posture correction, deep core strength, injury recovery, athletic refinement…"
                        className={`${inputBase} ${borderFor(
                          "goal"
                        )} resize-none leading-[1.75]`}
                      />
                    </div>

                    {/* Preferred slots */}
                    <div className="sm:col-span-2">
                      <label className="mb-3.5 block font-body text-[9.5px] font-medium uppercase tracking-[0.26em] text-[#1C1A17]/50">
                        Preferred Private Slot
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {SLOTS.map((slot) => {
                          const active = form.slot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() =>
                                setForm((prev) => ({ ...prev, slot: slot }))
                              }
                              className={`group relative overflow-hidden rounded-full border px-5 py-2.5 font-body text-[10.5px] font-medium uppercase tracking-[0.16em] transition-all duration-400 ${
                                active
                                  ? "border-[#D4AF37] bg-[#D4AF37]/12 text-[#1C1A17]"
                                  : "border-[#1C1A17]/14 text-[#1C1A17]/60 hover:border-[#1C1A17]/35 hover:text-[#1C1A17]"
                              }`}
                            >
                              {active && (
                                <Check
                                  className="mr-1.5 -ml-0.5 inline h-3 w-3 text-[#D4AF37]"
                                  strokeWidth={2.4}
                                />
                              )}
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Footer row */}
                  <div className="mt-10 flex flex-col gap-6 border-t border-[#1C1A17]/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
                      <span className="flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.2em] text-[#1C1A17]/45">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" strokeWidth={1.5} />
                        Fully Confidential
                      </span>
                      <span className="flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.2em] text-[#1C1A17]/45">
                        <Clock className="h-3.5 w-3.5 text-[#D4AF37]" strokeWidth={1.5} />
                        Reply Within 24H
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#1C1A17] px-9 py-4 font-body text-[10.5px] font-medium uppercase tracking-[0.24em] text-[#FBFBF9] transition-transform duration-500 hover:-translate-y-0.5"
                    >
                      <span className="absolute inset-0 z-0 translate-y-full bg-[#D4AF37] transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                      <span className="relative z-10 transition-colors duration-500 group-hover:text-[#1C1A17]">
                        Submit Private Application
                      </span>
                      <ArrowRight
                        className="relative z-10 h-3.5 w-3.5 transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#1C1A17]"
                        strokeWidth={1.6}
                      />
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease: EASE }}
                  className="relative flex flex-col items-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10"
                  >
                    <Check className="h-7 w-7 text-[#D4AF37]" strokeWidth={1.6} />
                  </motion.div>

                  <h3 className="mt-8 font-display text-[32px] font-light leading-tight tracking-[-0.01em] text-[#1C1A17] sm:text-[40px]">
                    Application received.
                  </h3>
                  <p className="mt-5 max-w-[460px] font-body text-[13.5px] font-light leading-[1.85] text-[#1C1A17]/58">
                    Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}. Anastasia
                    personally reviews every private application and will be in touch
                    within 24 hours to arrange your consultation.
                  </p>

                  <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
                    <a
                      href="https://www.instagram.com/stasmethod_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border border-[#1C1A17]/16 px-7 py-3.5 font-body text-[10px] font-medium uppercase tracking-[0.22em] text-[#1C1A17] transition-colors duration-400 hover:border-[#D4AF37]"
                    >
                      <Camera className="h-3.5 w-3.5 text-[#D4AF37]" strokeWidth={1.6} />
                      Follow @stasmethod_
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          level: "",
                          goal: "",
                          slot: "",
                        });
                      }}
                      className="font-body text-[10px] font-medium uppercase tracking-[0.22em] text-[#1C1A17]/45 underline decoration-[#1C1A17]/20 underline-offset-4 transition-colors duration-300 hover:text-[#1C1A17]"
                    >
                      Submit another response
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ====================================================================
 * FOOTER
 * ================================================================== */
function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#1C1A17]/10 bg-[#F5F4EF] px-5 pb-10 pt-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          {/* Brand */}
          <Reveal>
            <div className="font-display text-[24px] font-semibold tracking-[0.13em] text-[#1C1A17]">
              METHOD <span className="text-[#D4AF37]">BY</span> STAS
            </div>
            <p className="mt-5 max-w-[360px] font-body text-[13px] font-light leading-[1.85] text-[#1C1A17]/55">
              Private 1:1 reformer pilates & movement specialist. Precision, core
              stability, and elite athletic refinement — reserved exclusively for one
              client at a time.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://www.instagram.com/stasmethod_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Method by STAS on Instagram"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#1C1A17]/12 bg-[#FBFBF9] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
              >
                <Camera
                  className="h-4 w-4 text-[#1C1A17] transition-colors duration-500 group-hover:text-[#D4AF37]"
                  strokeWidth={1.5}
                />
              </a>
              <a
                href="mailto:hello@methodbystas.com"
                aria-label="Email Method by STAS"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#1C1A17]/12 bg-[#FBFBF9] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
              >
                <Mail
                  className="h-4 w-4 text-[#1C1A17] transition-colors duration-500 group-hover:text-[#D4AF37]"
                  strokeWidth={1.5}
                />
              </a>
              <a
                href="tel:+13050000000"
                aria-label="Call Method by STAS"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#1C1A17]/12 bg-[#FBFBF9] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
              >
                <Phone
                  className="h-4 w-4 text-[#1C1A17] transition-colors duration-500 group-hover:text-[#D4AF37]"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </Reveal>

          {/* Navigate */}
          <Reveal delay={0.1}>
            <h4 className="font-body text-[9.5px] font-medium uppercase tracking-[0.3em] text-[#1C1A17]/40">
              Navigate
            </h4>
            <ul className="mt-6 space-y-3.5">
              {[
                { label: "The Studio", href: "#studio" },
                { label: "1:1 Method", href: "#method" },
                { label: "Schedule", href: "#schedule" },
                { label: "Inquire", href: "#inquire" },
                { label: "Back to Top", href: "#top" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 font-body text-[12.5px] font-light text-[#1C1A17]/62 transition-colors duration-300 hover:text-[#1C1A17]"
                  >
                    <span className="h-px w-0 bg-[#D4AF37] transition-all duration-500 group-hover:w-4" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Location */}
          <Reveal delay={0.2}>
            <h4 className="font-body text-[9.5px] font-medium uppercase tracking-[0.3em] text-[#1C1A17]/40">
              Studio Location
            </h4>
            <div className="mt-6 flex items-start gap-3.5">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10">
                <MapPin className="h-4 w-4 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-display text-[18px] leading-tight text-[#1C1A17]">
                  Brickell, Miami
                </div>
                <div className="mt-1.5 font-body text-[12px] font-light leading-[1.75] text-[#1C1A17]/55">
                  Private Studio — Address shared
                  <br />
                  upon confirmed consultation.
                  <br />
                  Miami, FL · United States
                </div>
              </div>
            </div>

            <div className="mt-7 border-t border-[#1C1A17]/8 pt-5">
              <div className="font-body text-[9.5px] font-medium uppercase tracking-[0.26em] text-[#1C1A17]/40">
                Also Find Me At
              </div>
              <div className="mt-3 space-y-1.5">
                {["Club Studio Fitness", "The Most Miami", "Bodyrok"].map((s) => (
                  <div
                    key={s}
                    className="font-body text-[12px] font-light text-[#1C1A17]/60"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-5 border-t border-[#1C1A17]/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-[10.5px] font-light tracking-wide text-[#1C1A17]/42">
            © {new Date().getFullYear()} Method by STAS · Anastasia Wagner. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2.5">
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((l) => (
              <a
                key={l}
                href="#top"
                className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-[#1C1A17]/42 transition-colors duration-300 hover:text-[#D4AF37]"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ====================================================================
 * PAGE
 * ================================================================== */
export default function MethodByStas() {
  return (
    <div className="font-body min-h-screen bg-[#FBFBF9] text-[#1C1A17] antialiased">
      <GlobalStyles />
      <Navigation />
      <main>
        <Hero />
        <PlacementStrip />
        <Pillars />
        <StudioExperience />
        <Residencies />
        <Testimonials />
        <Intake />
      </main>
      <Footer />
    </div>
  );
}