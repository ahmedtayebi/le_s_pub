"use client";

import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   FinalCTA Section
   ───────────────────────────────────────────── */

export default function FinalCTA() {
    const trustItems = [
        { text: "بدون عقود" },
        { text: "تسليم سريع" },
        { text: "دعم مستمر" },
    ];

    return (
        <section
            dir="rtl"
            style={{
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#000",
                padding: "120px 24px",
                textAlign: "center",
                fontFamily: "'Cairo', sans-serif",
            }}
        >
            {/* Animated radial gradient background */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(ellipse 700px 400px at 50% 50%, rgba(201,168,76,0.1) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            {/* Content */}
            <div style={{ position: "relative", maxWidth: "640px", margin: "0 auto" }}>
                {/* Eyebrow badge */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{
                        display: "inline-block",
                        background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
                        border: "1px solid rgba(201,168,76,0.3)",
                        borderRadius: "30px",
                        padding: "8px 22px",
                        marginBottom: "28px",
                    }}
                >
                    <span style={{ color: "#C9A84C", fontWeight: 700, fontSize: "0.88rem" }}>
                        🚀 جاهز لرفع مستوى مشروعك؟
                    </span>
                </motion.div>

                {/* H2 */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    style={{
                        color: "#fff",
                        fontWeight: 900,
                        fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                        lineHeight: 1.3,
                        marginBottom: "20px",
                    }}
                >
                    لا تدع منافسيك يسبقونك
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{
                        color: "#888",
                        fontSize: "1.05rem",
                        lineHeight: 1.8,
                        margin: "0 auto 36px",
                        maxWidth: "480px",
                    }}
                >
                    براندك يستحق صفحة احترافية — ابدأ اليوم وكن الأول في مجالك
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    {/* Primary CTA */}
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() =>
                            document.getElementById("service-form")?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="font-extrabold cursor-pointer"
                        style={{
                            background: "linear-gradient(135deg, #C9A84C, #F0C040)",
                            color: "#000",
                            padding: "18px 48px",
                            borderRadius: "16px",
                            fontSize: "1.1rem",
                            border: "none",
                            fontFamily: "'Cairo', sans-serif",
                            boxShadow: "0 10px 40px rgba(201,168,76,0.35)",
                        }}
                    >
                        اطلب تصميمك الآن ✦
                    </motion.button>

                    {/* Ghost CTA */}
                    <motion.button
                        whileHover={{ scale: 1.04, borderColor: "#C9A84C" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() =>
                            window.open("https://wa.me/213777640477", "_blank")
                        }
                        className="font-bold cursor-pointer"
                        style={{
                            background: "transparent",
                            color: "#fff",
                            padding: "18px 36px",
                            borderRadius: "16px",
                            fontSize: "1rem",
                            border: "1.5px solid rgba(255,255,255,0.2)",
                            fontFamily: "'Cairo', sans-serif",
                            transition: "border-color 0.3s",
                        }}
                    >
                        تواصل عبر واتساب
                    </motion.button>
                </motion.div>

                {/* Trust Row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex items-center justify-center flex-wrap gap-6"
                    style={{ marginTop: "32px" }}
                >
                    {trustItems.map((item, i) => (
                        <span
                            key={i}
                            className="flex items-center gap-2"
                            style={{ color: "#555", fontSize: "0.85rem" }}
                        >
                            <span style={{ color: "#C9A84C", fontWeight: 700 }}>✓</span>
                            {item.text}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
