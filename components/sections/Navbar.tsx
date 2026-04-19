"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type SectionId = string;

interface NavItem {
  id: SectionId;
  label: string;
}

const mainNavItems: NavItem[] = [
  { id: "products", label: "أنواع الأكياس" },
  { id: "specs", label: "الأسعار" },
  { id: "order-form", label: "اطلب عرض سعر" },
];

const landingNavItems: NavItem[] = [
  { id: "problem-solution", label: "المشكلة" },
  { id: "portfolio", label: "أعمالنا" },
  { id: "features", label: "المميزات" },
  { id: "how-it-works", label: "كيف يعمل" },
  
];

export default function Navbar() {
  const pathname = usePathname();
  const isLandingService = pathname === "/landing-service";
  const navItems = isLandingService ? landingNavItems : mainNavItems;
  const ctaTarget = "order-form";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("");

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
      const sections = navItems
        .map((item) => {
          const el = document.getElementById(item.id);
          if (!el) return null;
          return {
            id: item.id,
            top: el.offsetTop,
            bottom: el.offsetTop + el.offsetHeight,
          };
        })
        .filter((section): section is { id: SectionId; top: number; bottom: number } => section !== null);

      for (const section of sections) {
        if (offsetY >= section.top && offsetY < section.bottom) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrollToSection = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={navStateStyle}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-[10000]"
      >
        <div className="mx-auto max-w-[1280px] h-[60px] md:h-[72px] px-4 md:px-8 flex items-center justify-between gap-4">
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

          <div className="hidden md:flex items-center justify-center gap-2">
            {navItems.map((item) => {
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
            })}
          </div>

          {/* Desktop: CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection(ctaTarget)}
              className="inline-flex items-center justify-center cursor-pointer border-0 rounded-[10px] px-6 py-2.5 text-black font-bold"
              style={{
                background: "linear-gradient(135deg, #C9A84C, #F0C040)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(201,168,76,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              اطلب الآن ✦
            </motion.button>
          </div>

          {/* Mobile: hamburger */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="relative w-10 h-10 flex items-center justify-center"
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
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] md:hidden"
            style={{
              background: "rgba(10,10,10,0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="h-full flex flex-col justify-center items-center px-6 pb-8">
              <div className="flex flex-col items-center gap-8 w-full max-w-sm">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="text-white text-2xl font-semibold transition-colors duration-200 hover:text-[#C9A84C]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="absolute bottom-8 left-6 right-6">
                <button
                  type="button"
                  onClick={() => scrollToSection(ctaTarget)}
                  className="w-full border-0 rounded-[10px] px-6 py-3 text-black font-bold"
                  style={{
                    background: "linear-gradient(135deg, #C9A84C, #F0C040)",
                  }}
                >
                  اطلب الآن ✦
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
