"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";

/* ─────────────────────────────────────────────
   Portfolio Data
   ───────────────────────────────────────────── */

const portfolios = [
    {
        id: 1,
        brandName: "Luxors",
        category: "بيع الروائح",
        colors: ["#2D1B69", "#11998e"],
        primaryColor: "#11998e",
        image: "/p1.png",
        link: "https://luxoradz.netlify.app/",
    },
    {
        id: 2,
        brandName: "Be Queen DZ",
        category: "أزياء نسائية",
        colors: ["#120b0b", "#8b6b4a"],
        primaryColor: "#C9A84C",
        image: "/pp2.png",
        link: "https://www.bequeencollection.com/",
    },
    {
        id: 3,
        brandName: "Kella Orpin",
        category: "موقع صيدلية",
        colors: ["#111827", "#6d4c41"],
        primaryColor: "#C9A84C",
        image: "/pp3.png",
        link: "https://kella-orpin.vercel.app/",
    },
];

/* ─────────────────────────────────────────────
   MockScreen — CSS-only landing page simulation
   ───────────────────────────────────────────── */

function MockScreen({ colors, primaryColor }: { colors: string[]; primaryColor: string }) {
    const [c1, c2] = colors;
    const alpha = (hex: string, a: number) => `${hex}${Math.round(a * 255).toString(16).padStart(2, "0")}`;

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(145deg, ${c1} 0%, ${c2} 100%)`,
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                overflow: "hidden",
            }}
        >
            {/* Fake Navbar */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    borderRadius: "8px",
                    padding: "8px 12px",
                }}
            >
                {/* Logo dot + bar */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: primaryColor }} />
                    <div style={{ width: "40px", height: "6px", borderRadius: "4px", backgroundColor: "rgba(255,255,255,0.3)" }} />
                </div>
                {/* Nav links */}
                <div style={{ display: "flex", gap: "8px" }}>
                    {[30, 22, 26].map((w, i) => (
                        <div key={i} style={{ width: `${w}px`, height: "5px", borderRadius: "3px", backgroundColor: "rgba(255,255,255,0.2)" }} />
                    ))}
                </div>
            </div>

            {/* Fake Hero */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "6px",
                }}
            >
                {/* Big headline bars */}
                <div style={{ width: "70%", height: "14px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.5)" }} />
                <div style={{ width: "50%", height: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.3)" }} />
                {/* Subtext bar */}
                <div style={{ width: "80%", height: "6px", borderRadius: "4px", backgroundColor: "rgba(255,255,255,0.15)", marginTop: "4px" }} />
                <div style={{ width: "65%", height: "6px", borderRadius: "4px", backgroundColor: "rgba(255,255,255,0.1)" }} />
                {/* CTA Button */}
                <div
                    style={{
                        marginTop: "6px",
                        padding: "6px 20px",
                        borderRadius: "20px",
                        backgroundColor: primaryColor,
                        fontSize: "0px",
                        width: "80px",
                        height: "18px",
                    }}
                />
            </div>

            {/* Fake Cards Row */}
            <div style={{ display: "flex", gap: "8px" }}>
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            height: "52px",
                            borderRadius: "8px",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: `1px solid ${alpha(primaryColor, 0.25)}`,
                            padding: "8px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                        }}
                    >
                        <div style={{ width: "50%", height: "5px", borderRadius: "3px", backgroundColor: primaryColor, opacity: 0.7 }} />
                        <div style={{ width: "80%", height: "4px", borderRadius: "3px", backgroundColor: "rgba(255,255,255,0.2)" }} />
                        <div style={{ width: "60%", height: "4px", borderRadius: "3px", backgroundColor: "rgba(255,255,255,0.12)" }} />
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Portfolio Card
   ───────────────────────────────────────────── */

function PortfolioCard({ item }: { item: typeof portfolios[0] }) {
    const [hovered, setHovered] = useState(false);

    const card = (
        <motion.div
            whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(0,0,0,0.4)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                cursor: item.link ? "pointer" : "default",
                position: "relative",
                minWidth: "280px",
                backgroundColor: "#0d0d0d",
                flexShrink: 0,
            }}
        >
            {/* Screenshot area */}
            <div style={{ height: "280px", position: "relative", overflow: "hidden" }}>
                {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={item.image}
                        alt={item.brandName}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                ) : (
                    <MockScreen colors={item.colors} primaryColor={item.primaryColor} />
                )}

                {/* Hover overlay */}
                {item.link && (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "rgba(0,0,0,0.65)",
                            opacity: hovered ? 1 : 0,
                            transition: "opacity 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <motion.div
                            initial={false}
                            animate={{ scale: hovered ? 1 : 0.85, opacity: hovered ? 1 : 0 }}
                            transition={{ duration: 0.25 }}
                            style={{
                                border: "1.5px solid #C9A84C",
                                color: "#fff",
                                padding: "10px 24px",
                                borderRadius: "30px",
                                fontWeight: 700,
                                fontSize: "0.9rem",
                                fontFamily: "'Cairo', sans-serif",
                                background: "rgba(201,168,76,0.1)",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                            }}
                        >
                            <ExternalLink size={16} />
                            عرض المشروع
                        </motion.div>
                    </div>
                )}
            </div>

            {/* Info bar */}
            <div
                style={{
                    backgroundColor: "#0d0d0d",
                    padding: "16px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                <div>
                    <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem", fontFamily: "'Cairo', sans-serif" }}>
                        {item.brandName}
                    </p>
                    <p style={{ color: "#C9A84C", fontSize: "0.8rem", marginTop: "2px", fontFamily: "'Cairo', sans-serif" }}>
                        {item.category}
                    </p>
                </div>
                <div style={{ color: "#C9A84C", display: "flex", alignItems: "center" }}>
                    <ArrowLeft size={18} color="#C9A84C" />
                </div>
            </div>
        </motion.div>
    );

    if (item.link) {
        return (
            <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
                {card}
            </a>
        );
    }

    return card;
}

/* ─────────────────────────────────────────────
   Main Section
   ───────────────────────────────────────────── */

export default function Portfolio() {
    return (
        <section
            id="portfolio"
            dir="rtl"
            style={{
                backgroundColor: "#000",
                padding: "96px 24px",
                fontFamily: "'Cairo', sans-serif",
            }}
        >
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                {/* ── Header ── */}
                <div style={{ textAlign: "center", marginBottom: "64px" }}>
                    {/* Eyebrow */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        style={{
                            color: "#C9A84C",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            letterSpacing: "0.05em",
                            marginBottom: "12px",
                            textTransform: "uppercase",
                        }}
                    >
                        <span style={{
                            display: 'inline-block',
                            width: '20px',
                            height: '2px',
                            background: '#C9A84C',
                            borderRadius: '2px',
                            marginLeft: '8px',
                            verticalAlign: 'middle'
                        }} />
                        أعمالنا تتحدث عنا

                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{
                            color: "#fff",
                            fontWeight: 900,
                            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                            marginBottom: "12px",
                        }}
                    >
                        نماذج من تصاميمنا
                    </motion.h2>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            width: "60px",
                            height: "4px",
                            background: "linear-gradient(90deg, #C9A84C, #F0C040)",
                            borderRadius: "2px",
                            margin: "0 auto 16px",
                            transformOrigin: "center",
                        }}
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        style={{ color: "#666", fontSize: "1rem" }}
                    >
                        كل صفحة مصممة خصيصاً لعلامة تجارية مختلفة
                    </motion.p>
                </div>

                {/* ── Portfolio Grid / Scroll ── */}
                {/* Mobile: horizontal scroll | Desktop: 3-col grid */}
                <div
                    className="portfolio-row"
                    style={{
                        display: "flex",
                        gap: "24px",
                        overflowX: "auto",
                        scrollSnapType: "x mandatory",
                        paddingBottom: "16px",
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    {portfolios.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.12 }}
                            style={{ scrollSnapAlign: "start", flex: "0 0 280px" }}
                            className="portfolio-card-wrap"
                        >
                            <PortfolioCard item={item} />
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (min-width: 768px) {
                    .portfolio-row {
                        display: grid !important;
                        grid-template-columns: repeat(3, 1fr) !important;
                        overflow-x: visible !important;
                    }
                    .portfolio-card-wrap {
                        flex: unset !important;
                    }
                }
                .portfolio-row::-webkit-scrollbar {
                    height: 4px;
                }
                .portfolio-row::-webkit-scrollbar-track {
                    background: #111;
                }
                .portfolio-row::-webkit-scrollbar-thumb {
                    background: rgba(201,168,76,0.3);
                    border-radius: 4px;
                }
            `}</style>
        </section>
    );
}
