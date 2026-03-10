"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const viewportConfig = { once: true, margin: "-50px" };

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
      <span
        aria-hidden="true"
        className="inline-block"
        style={{ width: "30px", height: "3px", background: "#C9A84C", borderRadius: "999px" }}
      />
      <h4 className="text-white font-bold text-base tracking-[1px]">{title}</h4>
      <span
        aria-hidden="true"
        className="inline-block lg:hidden"
        style={{ width: "30px", height: "3px", background: "#C9A84C", borderRadius: "999px" }}
      />
    </div>
  );
}

export default function Footer() {
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
              className="w-100 h-50 object-contain"
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
          className="mx-auto max-w-[500px] grid grid-cols-1 gap-12 text-center"
          style={{ padding: "60px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div style={{ width: "100%", maxWidth: "340px", margin: "0 auto" }}>
              {/* Brand Row */}
              <motion.a href="https://instagram.com/le_s_pub" target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "20px", justifyContent: "flex-start", textDecoration: "none", marginBottom: "20px", direction: "ltr" }}
                whileHover={{ x: 6 }}
              >
                <div style={{
                  width: "70px", height: "70px", borderRadius: "50%",
                  background: "rgba(201,168,76,0.1)",
                  border: "1.5px solid rgba(201,168,76,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Image src="/logo.png" alt="logo" width={46} height={46}
                    style={{ objectFit: "contain", borderRadius: "50%" }} />
                </div>
                <span style={{ color: "#C9A84C", fontWeight: 800, fontSize: "1.4rem" }}>
                  Le S Publicité
                </span>
              </motion.a>

              {/* Divider */}
              <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "20px" }} />

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={viewportConfig}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
                className="mt-8 text-white font-black leading-[1.4]"
                style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)", textAlign: "center", color: "#C9A84C" }}
              >
                تابعنا باه يوصلك كل جديد
              </motion.p>
              <br />

              {/* Social Rows */}
              {/* Instagram */}
              <motion.a href="https://instagram.com/le_s_pub" target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "flex-start", textDecoration: "none", marginBottom: "16px", direction: "ltr" }}
                whileHover={{ x: 6 }}
              >
                <div style={{
                  width: "70px", height: "70px", borderRadius: "50%",
                  background: "radial-gradient(circle at 30% 110%, #fdf497 0%, #fd5949 40%, #d6249f 60%, #285AEB 90%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5ZM12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.85a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
                  </svg>
                </div>
                <div style={{
                  background: "black",
                  border: "2px solid #22c55e",
                  padding: "8px 20px", borderRadius: "10px", color: "white", fontWeight: 800, fontSize: "1.1rem", textAlign: "left"
                }}>
                  @le_s_pub
                </div>
              </motion.a>

              {/* Facebook */}
              <motion.a href="https://facebook.com/Le-s-pub" target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "flex-start", textDecoration: "none", marginBottom: "16px", direction: "ltr" }}
                whileHover={{ x: 6 }}
              >
                <div style={{
                  width: "70px", height: "70px", borderRadius: "50%",
                  background: "#1877F2",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                    <path d="M13.5 22v-8h2.7l.5-3h-3.2V8.9c0-.9.3-1.6 1.7-1.6h1.7V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.4V11H8v3h2.2v8h3.3Z" />
                  </svg>
                </div>
                <div style={{
                  background: "black",
                  border: "2px solid #22c55e",
                  padding: "8px 20px", borderRadius: "10px", color: "white", fontWeight: 800, fontSize: "1.1rem", textAlign: "left"
                }}>
                  Le S Pub
                </div>
              </motion.a>

              {/* WhatsApp */}
              <motion.a href="https://wa.me/213777640477" target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "flex-start", textDecoration: "none", marginBottom: "16px", direction: "ltr" }}
                whileHover={{ x: 6 }}
              >
                <div style={{
                  width: "70px", height: "70px", borderRadius: "50%",
                  background: "#25D366",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div style={{
                  background: "black",
                  border: "2px solid #22c55e",
                  padding: "8px 20px", borderRadius: "10px", color: "white", fontWeight: 800, fontSize: "1.1rem", textAlign: "left"
                }}>
                  0777 640 477
                </div>
              </motion.a>

              {/* TikTok */}
              <motion.a href="https://tiktok.com/@le_s_pub" target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "flex-start", textDecoration: "none", marginBottom: "16px", direction: "ltr" }}
                whileHover={{ x: 6 }}
              >
                <div style={{
                  width: "70px", height: "70px", borderRadius: "50%",
                  background: "#010101",
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06Z" />
                  </svg>
                </div>
                <div style={{
                  background: "black",
                  border: "2px solid #22c55e",
                  padding: "8px 20px", borderRadius: "10px", color: "white", fontWeight: 800, fontSize: "1.1rem", textAlign: "left"
                }}>
                  @le_s_pub
                </div>
              </motion.a>
            </div>

            <br />
            <br />
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={viewportConfig}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
              className="mt-8 text-white font-black leading-[1.4]"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              معانا كوموندي وروح مهني
            </motion.p>
          </motion.div>
        </section>

        <section style={{ background: "#050505", padding: "20px 24px" }}>
          <div className="mx-auto max-w-[1100px] flex flex-wrap items-center justify-between gap-4">
            <span className="text-[#666] text-center flex-1" style={{ fontSize: "0.75rem" }}>
              © 2026 Le S Publicité — جميع الحقوق محفوظة
            </span>
          </div>
        </section>
      </div>
    </footer>
  );
}
