"use client";

import { motion } from "framer-motion";
import { Check, Palette, Smartphone, Clock } from "lucide-react";

// ─── Floating Badge ──────────────────────────────────────────────────────────

function FloatingBadge({
    icon,
    text,
    delay,
    style,
}: {
    icon: React.ReactNode;
    text: string;
    delay: number;
    style: React.CSSProperties;
}) {
    return (
        <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
            style={{
                position: "absolute",
                background: "rgba(0,0,0,0.8)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: 20,
                padding: "8px 14px",
                color: "#fff",
                fontSize: "0.8rem",
                fontFamily: "Cairo, sans-serif",
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                whiteSpace: "nowrap",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                ...style,
            }}
        >
            {icon} {text}
        </motion.div>
    );
}

// ─── Mini Browser Mockup ─────────────────────────────────────────────────────

function BrowserMockup() {
    return (
        <motion.div
            style={{ perspective: 1000 }}
            initial={{ opacity: 0, x: -40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.div
                animate={{ rotateY: [-3, 3, -3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "relative" }}
            >
                {/* Floating badges */}
                <FloatingBadge
                    icon={<Palette size={14} color="#C9A84C" />}
                    text="تصميم عصري"
                    delay={0}
                    style={{ top: -16, right: -30 }}
                />
                <FloatingBadge
                    icon={<Smartphone size={14} color="#C9A84C" />}
                    text="متجاوب 100%"
                    delay={0.5}
                    style={{ bottom: 30, left: -36 }}
                />
                <FloatingBadge
                    icon={<Clock size={14} color="#C9A84C" />}
                    text="تسليم خلال 72h"
                    delay={1}
                    style={{ top: "45%", right: -50 }}
                />

                {/* Browser window */}
                <div
                    style={{
                        width: "100%",
                        maxWidth: 480,
                        background: "#0d0d0d",
                        borderRadius: 16,
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow:
                            "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
                        overflow: "hidden",
                        margin: "0 auto",
                    }}
                >
                    {/* Top bar */}
                    <div
                        style={{
                            height: 44,
                            background: "#1a1a1a",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            padding: "0 16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderRadius: "16px 16px 0 0",
                        }}
                    >
                        <div style={{ display: "flex", gap: 8 }}>
                            {(["#ff5f57", "#febc2e", "#28c840"] as const).map((c) => (
                                <div
                                    key={c}
                                    style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: "50%",
                                        background: c,
                                    }}
                                />
                            ))}
                        </div>
                        <div
                            style={{
                                background: "#252525",
                                borderRadius: 6,
                                padding: "4px 12px",
                                width: "60%",
                                textAlign: "center",
                                color: "#666",
                                fontSize: "0.78rem",
                                fontFamily: "monospace",
                            }}
                        >
                            www.votrebrand.dz
                        </div>
                        <div style={{ width: 52 }} />
                    </div>

                    {/* Section 1 — Mini Hero */}
                    <div
                        style={{
                            height: 120,
                            background: "linear-gradient(135deg, #1a1a1a, #0d0d0d)",
                            padding: 16,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: 8,
                        }}
                    >
                        <div
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #C9A84C, #F0C040)",
                            }}
                        />
                        <div
                            style={{
                                width: "70%",
                                height: 8,
                                borderRadius: 4,
                                background: "linear-gradient(90deg, #C9A84C, #F0C040)",
                                opacity: 0.7,
                            }}
                        />
                        <div
                            style={{
                                width: "50%",
                                height: 6,
                                borderRadius: 3,
                                background: "rgba(255,255,255,0.3)",
                            }}
                        />
                        <div
                            style={{
                                width: 72,
                                height: 20,
                                borderRadius: 6,
                                background: "linear-gradient(135deg, #C9A84C, #F0C040)",
                                marginTop: 4,
                            }}
                        />
                    </div>

                    {/* Section 2 — Mini Cards */}
                    <div
                        style={{
                            height: 70,
                            background: "#111",
                            padding: "8px 12px",
                            display: "flex",
                            gap: 8,
                            alignItems: "stretch",
                        }}
                    >
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                style={{
                                    flex: 1,
                                    background: "#1a1a1a",
                                    borderRadius: 6,
                                    border: "1px solid rgba(201,168,76,0.3)",
                                }}
                            />
                        ))}
                    </div>

                    {/* Section 3 — Mini Form */}
                    <div
                        style={{
                            height: 90,
                            background: "#0d0d0d",
                            padding: "10px 12px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 6,
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: 14,
                                borderRadius: 7,
                                background: "#222",
                            }}
                        />
                        <div
                            style={{
                                width: "80%",
                                height: 14,
                                borderRadius: 7,
                                background: "#222",
                            }}
                        />
                        <div
                            style={{
                                width: 80,
                                height: 18,
                                borderRadius: 6,
                                background: "linear-gradient(135deg, #C9A84C, #F0C040)",
                                marginTop: 2,
                            }}
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── HeroService ─────────────────────────────────────────────────────────────

export default function HeroService() {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="hero-service"
            dir="rtl"
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                background: `
          radial-gradient(ellipse 600px 500px at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 400px 400px at 80% 20%, rgba(201,168,76,0.05) 0%, transparent 60%),
          #000000`,
                fontFamily: "Cairo, sans-serif",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <style>{`
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(201,168,76,0.4); }
          70%  { box-shadow: 0 0 0 8px rgba(201,168,76,0); }
          100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
        }
      `}</style>

            <div
                style={{
                    maxWidth: 1200,
                    width: "100%",
                    margin: "0 auto",
                    padding: "120px 24px 60px",
                    display: "grid",
                    gridTemplateColumns: "55% 45%",
                    gap: 40,
                    alignItems: "center",
                }}
                className="hero-service-grid"
            >
                {/* ─── Right Column — Content ─── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <span
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                background: "rgba(201,168,76,0.1)",
                                border: "1px solid rgba(201,168,76,0.3)",
                                borderRadius: 30,
                                padding: "6px 18px",
                            }}
                        >
                            <span
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    background: "#C9A84C",
                                    display: "inline-block",
                                    animation: "pulse-ring 2s infinite",
                                }}
                            />
                            <span
                                style={{
                                    color: "#C9A84C",
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    fontFamily: "Cairo, sans-serif",
                                }}
                            >
                                خدمة جديدة متوفرة الآن
                            </span>
                        </span>
                    </motion.div>

                    {/* H1 */}
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                color: "#fff",
                                fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
                                fontWeight: 900,
                                lineHeight: 1.2,
                                margin: 0,
                                fontFamily: "Cairo, sans-serif",
                            }}
                        >
                            صمّم صفحة احترافية
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
                                fontWeight: 900,
                                lineHeight: 1.2,
                                margin: 0,
                                fontFamily: "Cairo, sans-serif",
                            }}
                        >
                            <span
                                style={{
                                    background: "linear-gradient(135deg, #C9A84C, #F0C040)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                لعلامتك التجارية
                            </span>{" "}
                            <span style={{ color: "#fff" }}>الآن</span>
                        </motion.h1>
                    </div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        style={{
                            color: "#888",
                            fontSize: "1.05rem",
                            maxWidth: 480,
                            lineHeight: 1.8,
                            margin: 0,
                            fontFamily: "Cairo, sans-serif",
                        }}
                    >
                        اعرف لماذا تحتاج Landing Page لتعزيز حضورك الرقمي
                        <br />
                        وجذب عملائك بسهولة — نصمم، نبرمج، نسلّم جاهزة.
                    </motion.p>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.5 }}
                        style={{ display: "flex", gap: 24, flexWrap: "wrap" }}
                    >
                        {["تسليم سريع", "تصميم عصري", "دعم مستمر"].map((item) => (
                            <span
                                key={item}
                                style={{
                                    color: "#888",
                                    fontSize: "0.85rem",
                                    fontFamily: "Cairo, sans-serif",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                }}
                            >
                                <Check size={14} color="#C9A84C" strokeWidth={2.5} /> {item}
                            </span>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65, duration: 0.5 }}
                        style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
                    >
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => scrollTo("service-form")}
                            style={{
                                background: "linear-gradient(135deg, #C9A84C, #F0C040)",
                                color: "#000",
                                fontWeight: 800,
                                padding: "16px 36px",
                                borderRadius: 14,
                                fontSize: "1rem",
                                border: "none",
                                cursor: "pointer",
                                fontFamily: "Cairo, sans-serif",
                                boxShadow: "0 8px 30px rgba(201,168,76,0.3)",
                                transition: "box-shadow 0.3s",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                                    "0 12px 40px rgba(201,168,76,0.5)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                                    "0 8px 30px rgba(201,168,76,0.3)";
                            }}
                        >
                            اطلب تصميمك الآن
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => scrollTo("problem-solution")}
                            style={{
                                background: "transparent",
                                border: "1.5px solid rgba(255,255,255,0.2)",
                                color: "#fff",
                                padding: "16px 28px",
                                borderRadius: 14,
                                fontSize: "1rem",
                                cursor: "pointer",
                                fontFamily: "Cairo, sans-serif",
                                transition: "border-color 0.3s, color 0.3s",
                            }}
                            onMouseEnter={(e) => {
                                const btn = e.currentTarget as HTMLButtonElement;
                                btn.style.borderColor = "#C9A84C";
                                btn.style.color = "#C9A84C";
                            }}
                            onMouseLeave={(e) => {
                                const btn = e.currentTarget as HTMLButtonElement;
                                btn.style.borderColor = "rgba(255,255,255,0.2)";
                                btn.style.color = "#fff";
                            }}
                        >
                            لماذا تحتاج Landing Page؟
                        </motion.button>
                    </motion.div>
                </div>

                {/* ─── Left Column — Visual Mockup ─── */}
                <div style={{ position: "relative" }}>
                    <BrowserMockup />
                </div>
            </div>

            {/* Responsive override for mobile */}
            <style>{`
        @media (max-width: 768px) {
          .hero-service-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            padding-top: 100px !important;
          }
        }
      `}</style>
        </section>
    );
}
