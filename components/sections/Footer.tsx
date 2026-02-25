"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type QuickLink = {
  label: string;
  target: "top" | "#products" | "#specs" | "#order-form";
};

type SocialLink = {
  name: "Instagram" | "Facebook" | "WhatsApp";
  handle: string;
  href: string;
  bgColor: string;
  borderColor: string;
};

const quickLinks: QuickLink[] = [
  { label: "الرئيسية", target: "top" },
  { label: "أنواع الأكياس", target: "#products" },
  { label: "جدول الأسعار", target: "#specs" },
  { label: "اطلب عرض سعر", target: "#order-form" },
];

const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    handle: "@le_s_pub",
    href: "https://instagram.com/le_s_pub",
    bgColor: "rgba(225,48,108,0.1)",
    borderColor: "rgba(225,48,108,0.2)",
  },
  {
    name: "Facebook",
    handle: "Le s pub",
    href: "https://facebook.com/Le-s-pub",
    bgColor: "rgba(24,119,242,0.1)",
    borderColor: "rgba(24,119,242,0.2)",
  },
  {
    name: "WhatsApp",
    handle: "07 77 64 04 77",
    href: "https://wa.me/213777640477",
    bgColor: "rgba(37,211,102,0.1)",
    borderColor: "rgba(37,211,102,0.2)",
  },
];

const viewportConfig = { once: true, margin: "-50px" };

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        aria-hidden="true"
        className="inline-block"
        style={{ width: "30px", height: "3px", background: "#C9A84C", borderRadius: "999px" }}
      />
      <h4 className="text-white font-bold text-base tracking-[1px]">{title}</h4>
    </div>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Zm5.35-2.1a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.5-3h-3.2V8.9c0-.9.3-1.6 1.7-1.6h1.7V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.4V11H8v3h2.2v8h3.3Z" />
    </svg>
  );
}

function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 2h2.5c.5 0 .9.3 1 .8l.7 3a1 1 0 0 1-.3 1l-1.8 1.6a14.8 14.8 0 0 0 6.9 6.9l1.6-1.8a1 1 0 0 1 1-.3l3 .7c.5.1.8.5.8 1v2.5c0 .6-.4 1-1 1C10.2 19.1 4.9 13.8 4.9 3a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function SocialPrimaryIcon({ name }: { name: SocialLink["name"] }) {
  if (name === "Instagram") return <InstagramIcon size={18} />;
  if (name === "Facebook") return <FacebookIcon size={18} />;
  return <WhatsAppIcon size={18} />;
}

function SocialTinyIcon({ name }: { name: SocialLink["name"] }) {
  if (name === "Instagram") return <InstagramIcon size={16} />;
  if (name === "Facebook") return <FacebookIcon size={16} />;
  return <WhatsAppIcon size={16} />;
}

export default function Footer() {
  const scrollToTarget = (target: QuickLink["target"]) => {
    if (target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer
      style={{
        background: "#080808",
        padding: "80px 0 0 0",
        borderTop: "2px solid rgba(201,168,76,0.3)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "420px",
          background:
            "radial-gradient(ellipse 800px 400px at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-[1]">
        <section
          className="text-center px-6"
          style={{ paddingBottom: "60px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
            whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 16px rgba(201,168,76,0.45))" }}
            className="inline-block"
          >
            <Image
              src="/logo.png"
              alt="Le S Publicité"
              width={160}
              height={80}
              className="w-auto h-auto object-contain"
            />
          </motion.div>

          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
            className="mt-4 font-black tracking-[3px] uppercase"
            style={{
              fontSize: "1.8rem",
              background: "linear-gradient(135deg, #C9A84C, #F0C040, #C9A84C)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Le S Publicité
          </motion.h3>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
            className="mt-8 text-white font-black leading-[1.4]"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
          >
            نحن لا نبيع أكياساً
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
            className="text-white font-black leading-[1.4]"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
          >
            نبيع
            <span
              style={{
                marginInline: "8px",
                background: "linear-gradient(135deg, #C9A84C, #F0C040, #C9A84C)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              الانطباع الأول
            </span>
            لعلامتك التجارية
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.4 }}
          >
            <div
              style={{
                width: "80px",
                height: "3px",
                margin: "24px auto",
                borderRadius: "999px",
                background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
              }}
            />

            <p
              className="mx-auto"
              style={{
                fontSize: "1rem",
                color: "#888",
                maxWidth: "500px",
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              كل كيس يحمل شعارك هو إعلان متحرك في يد عميلك
            </p>
          </motion.div>
        </section>

        <section
          className="mx-auto max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 gap-12"
          style={{ padding: "60px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
          >
            <SectionTitle title="روابط سريعة" />

            <div className="flex flex-col">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => scrollToTarget(link.target)}
                  className="group flex items-center gap-2 text-[#888] text-[0.9rem] py-2 transition-colors duration-200 hover:text-white cursor-pointer"
                >
                  <span className="text-[#C9A84C] transition-transform duration-200 group-hover:translate-x-1">→</span>
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
          >
            <SectionTitle title="تواصل معنا" />

            <a
              href="tel:+213777640477"
              className="inline-flex items-center gap-2 text-white font-extrabold text-[1.3rem] transition-colors duration-200 hover:text-[#C9A84C]"
            >
              <span style={{ color: "#C9A84C" }}>
                <PhoneIcon size={18} />
              </span>
              07 77 64 04 77
            </a>

            <div className="mt-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: -6, scale: 1.02, borderColor: "rgba(201,168,76,0.4)" }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3"
                  style={{
                    padding: "10px 14px",
                    borderRadius: "12px",
                    border: `1px solid ${social.borderColor}`,
                    background: social.bgColor,
                    marginBottom: "8px",
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "rgba(201,168,76,0.1)",
                      color: "#C9A84C",
                    }}
                  >
                    <SocialPrimaryIcon name={social.name} />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-white text-[0.85rem] font-semibold">{social.name}</span>
                    <span className="text-[#888] text-xs">{social.handle}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>

        <section style={{ background: "#050505", padding: "20px 24px" }}>
          <div className="mx-auto max-w-[1100px] flex flex-wrap items-center justify-between gap-4">
            <span className="text-[#444] text-[0.8rem]">صُنع بـ ❤️ في الجزائر 🇩🇿</span>

            <span className="text-[#333] text-[0.8rem]">© 2025 Le S Publicité — جميع الحقوق محفوظة</span>

            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={`tiny-${social.name}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.06, color: "#C9A84C" }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "rgba(255,255,255,0.04)",
                    color: "#555",
                  }}
                  aria-label={social.name}
                >
                  <SocialTinyIcon name={social.name} />
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
