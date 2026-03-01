"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SectionId = "products" | "specs" | "order-form";

interface NavScrollItem {
  kind: "scroll";
  id: SectionId;
  label: string;
}

interface NavDropdownItem {
  kind: "dropdown";
  label: string;
}

type NavItem = NavScrollItem | NavDropdownItem;

interface ServiceItem {
  title: string;
  titleFr: string;
  description: string;
  icon: string;
  href: string;
  badge: string;
  badgeColor: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const navItems: NavItem[] = [
  { kind: "scroll", id: "products", label: "أنواع الأكياس" },
  { kind: "scroll", id: "specs", label: "الأسعار" },
  { kind: "dropdown", label: "استكشف" },
  { kind: "scroll", id: "order-form", label: "اطلب عرض سعر" },
];

const scrollNavItems = navItems.filter((i): i is NavScrollItem => i.kind === "scroll");

const services: ServiceItem[] = [
  {
    title: "تصميم Landing Page",
    titleFr: "Landing Page Design",
    description: "صفحة هبوط احترافية لعلامتك التجارية",
    icon: "🎨",
    href: "/landing-service",
    badge: "متوفر الآن",
    badgeColor: "#22c55e",
  },
];

// ─── Dropdown Panel ───────────────────────────────────────────────────────────

function ExploreDropdown({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        top: "calc(100% + 12px)",
        right: "50%",
        transform: "translateX(50%)",
        width: 320,
        background: "rgba(10,10,10,0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(201,168,76,0.2)",
        borderRadius: 20,
        padding: 12,
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.05)",
        zIndex: 9999,
        direction: "rtl",
      }}
    >
      {/* Header */}
      <div
        style={{
          color: "#666",
          fontSize: "0.72rem",
          letterSpacing: "2px",
          textTransform: "uppercase",
          padding: "4px 12px 8px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          marginBottom: 8,
          fontFamily: "Cairo, sans-serif",
        }}
      >
        خدماتنا
      </div>

      {/* Service items */}
      {services.map((svc) => (
        <motion.div
          key={svc.href}
          onClick={() => { onClose(); router.push(svc.href); }}
          whileHover={{
            backgroundColor: "rgba(201,168,76,0.06)",
            borderColor: "rgba(201,168,76,0.25)",
            x: -4,
          }}
          style={{
            padding: "12px 14px",
            borderRadius: 14,
            border: "1px solid transparent",
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            gap: 14,
            alignItems: "center",
            transition: "border-color 0.2s",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
              border: "1px solid rgba(201,168,76,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.4rem",
              flexShrink: 0,
            }}
          >
            {svc.icon}
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  fontFamily: "Cairo, sans-serif",
                }}
              >
                {svc.title}
              </span>
              {svc.badge && (
                <span
                  style={{
                    background: "rgba(34,197,94,0.15)",
                    color: svc.badgeColor,
                    border: "1px solid rgba(34,197,94,0.3)",
                    borderRadius: 20,
                    padding: "1px 8px",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    fontFamily: "Cairo, sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  {svc.badge}
                </span>
              )}
            </div>
            <div
              style={{
                color: "#666",
                fontSize: "0.8rem",
                marginTop: 2,
                fontFamily: "Cairo, sans-serif",
              }}
            >
              {svc.description}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          marginTop: 8,
          padding: "10px 0 4px",
          textAlign: "center",
          color: "#444",
          fontSize: "0.78rem",
          fontFamily: "Cairo, sans-serif",
        }}
      >
        المزيد من الخدمات قريباً 🔜
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("products");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileExplore, setMobileExplore] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ── Scroll detection ──────────────────────────────────────────────────────
  const navStateStyle = useMemo(
    () =>
      isScrolled
        ? {
          backgroundColor: "rgba(10,10,10,0.95)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
          borderBottom: "1px solid rgba(201,168,76,0.2)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }
        : {
          backgroundColor: "rgba(10,10,10,0)",
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          borderBottom: "1px solid rgba(201,168,76,0)",
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
        },
    [isScrolled],
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY >= 50);

      const offsetY = scrollY + 140;
      const sections = scrollNavItems
        .map((item) => {
          const el = document.getElementById(item.id);
          if (!el) return null;
          return {
            id: item.id,
            top: el.offsetTop,
            bottom: el.offsetTop + el.offsetHeight,
          };
        })
        .filter(
          (s): s is { id: SectionId; top: number; bottom: number } => s !== null,
        );

      for (const section of sections) {
        if (offsetY >= section.top && offsetY < section.bottom) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Body overflow lock ────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // ── Close dropdown on outside click ──────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const scrollToSection = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Desktop / Shared Nav ── */}
      <motion.nav
        initial={false}
        animate={navStateStyle}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-[10000]"
      >
        <div className="mx-auto max-w-[1280px] h-[60px] md:h-[72px] px-4 md:px-8 flex items-center justify-between gap-4">

          {/* Logo — Right (RTL) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="shrink-0 cursor-pointer"
            aria-label="Le S Publicité"
          >
            <Image
              src="/logo.png"
              alt="Le S Publicité"
              width={120}
              height={60}
              className="h-[42px] md:h-[52px] w-auto object-contain"
              priority
            />
          </motion.button>

          {/* Center Links */}
          <div className="hidden md:flex items-center justify-center gap-1">
            {navItems.map((item, idx) => {
              if (item.kind === "scroll") {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="relative cursor-pointer rounded-lg px-4 py-2 text-[0.95rem] font-medium text-white transition-all duration-200 hover:text-[#C9A84C] hover:bg-[rgba(201,168,76,0.08)]"
                    style={{ color: isActive ? "#C9A84C" : "#FFFFFF" }}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute left-2 right-2 -bottom-0.5 h-[2px] rounded-full bg-[#C9A84C]" />
                    )}
                  </button>
                );
              }

              // ──── Dropdown trigger ────────────────────────────────────────
              return (
                <div
                  key={`dropdown-${idx}`}
                  ref={dropdownRef}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="flex items-center gap-1 cursor-pointer rounded-lg px-4 py-2 text-[0.95rem] font-medium transition-all duration-200 hover:bg-[rgba(201,168,76,0.08)]"
                    style={{ color: dropdownOpen ? "#C9A84C" : "#FFFFFF" }}
                  >
                    {item.label}
                    <motion.span
                      animate={{ rotate: dropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <ChevronDown size={16} />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <ExploreDropdown onClose={() => setDropdownOpen(false)} />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* CTA — Left (RTL: leftmost visually) */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection("order-form")}
            className="hidden md:inline-flex items-center justify-center cursor-pointer border-0 rounded-[10px] px-6 py-2.5 text-black font-bold"
            style={{ background: "linear-gradient(135deg, #C9A84C, #F0C040)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 20px rgba(201,168,76,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            اطلب الآن ✦
          </motion.button>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -7 }}
              transition={{ duration: 0.25 }}
              className="absolute w-6 h-[2px] bg-white rounded"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute w-6 h-[2px] bg-white rounded"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 7 }}
              transition={{ duration: 0.25 }}
              className="absolute w-6 h-[2px] bg-white rounded"
            />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Overlay ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            activeSection={activeSection}
            mobileExplore={mobileExplore}
            setMobileExplore={setMobileExplore}
            scrollToSection={scrollToSection}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────

function MobileMenu({
  activeSection,
  mobileExplore,
  setMobileExplore,
  scrollToSection,
}: {
  activeSection: SectionId;
  mobileExplore: boolean;
  setMobileExplore: (v: boolean) => void;
  scrollToSection: (id: SectionId) => void;
}) {
  const router = useRouter();

  return (
    <motion.aside
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] md:hidden overflow-y-auto"
      style={{
        background: "rgba(10,10,10,0.98)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        direction: "rtl",
      }}
    >
      <div className="min-h-full flex flex-col justify-center items-center px-6 py-24">
        <div className="flex flex-col items-center gap-6 w-full max-w-sm">

          {/* Scroll links */}
          {scrollNavItems
            .filter((i) => i.id !== "order-form")
            .map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-white text-2xl font-semibold transition-colors duration-200 hover:text-[#C9A84C]"
                style={{ color: activeSection === item.id ? "#C9A84C" : "#fff" }}
              >
                {item.label}
              </button>
            ))}

          {/* استكشف accordion */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => setMobileExplore(!mobileExplore)}
              className="w-full flex items-center justify-center gap-2 text-white text-2xl font-semibold transition-colors duration-200 hover:text-[#C9A84C]"
              style={{ color: mobileExplore ? "#C9A84C" : "#fff" }}
            >
              استكشف
              <motion.span
                animate={{ rotate: mobileExplore ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <ChevronDown size={20} />
              </motion.span>
            </button>

            <AnimatePresence>
              {mobileExplore && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  {/* Section label */}
                  <div
                    style={{
                      color: "#C9A84C",
                      fontSize: "0.72rem",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      fontFamily: "Cairo, sans-serif",
                      textAlign: "center",
                      padding: "16px 0 12px",
                    }}
                  >
                    خدماتنا
                  </div>

                  {/* Service cards */}
                  {services.map((svc) => (
                    <motion.div
                      key={svc.href}
                      onClick={() => { router.push(svc.href); }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        padding: 16,
                        borderRadius: 16,
                        border: "1px solid rgba(201,168,76,0.2)",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "row",
                        gap: 14,
                        alignItems: "center",
                        background: "rgba(201,168,76,0.04)",
                        marginBottom: 8,
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 12,
                          background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
                          border: "1px solid rgba(201,168,76,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.5rem",
                          flexShrink: 0,
                        }}
                      >
                        {svc.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <span
                            style={{
                              color: "#fff",
                              fontWeight: 700,
                              fontSize: "1rem",
                              fontFamily: "Cairo, sans-serif",
                            }}
                          >
                            {svc.title}
                          </span>
                          {svc.badge && (
                            <span
                              style={{
                                background: "rgba(34,197,94,0.15)",
                                color: svc.badgeColor,
                                border: "1px solid rgba(34,197,94,0.3)",
                                borderRadius: 20,
                                padding: "2px 10px",
                                fontSize: "0.72rem",
                                fontWeight: 600,
                                fontFamily: "Cairo, sans-serif",
                              }}
                            >
                              {svc.badge}
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            color: "#888",
                            fontSize: "0.85rem",
                            marginTop: 4,
                            fontFamily: "Cairo, sans-serif",
                          }}
                        >
                          {svc.description}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA sticky bottom */}
        <div className="absolute bottom-8 left-6 right-6">
          <button
            type="button"
            onClick={() => scrollToSection("order-form")}
            className="w-full border-0 rounded-[10px] px-6 py-3 text-black font-bold text-lg"
            style={{ background: "linear-gradient(135deg, #C9A84C, #F0C040)" }}
          >
            اطلب الآن ✦
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
