"use client";

import { motion } from "framer-motion";
import { MessageSquare, PenTool, Rocket, ChevronLeft } from "lucide-react";

/* ─────────────────────────────────────────────
   Steps Data
   ───────────────────────────────────────────── */

const GOLD = "#C9A84C";

const steps = [
    {
        number: "01",
        icon: <MessageSquare size={28} color={GOLD} strokeWidth={1.8} />,
        title: "تواصل معنا",
        desc: "أرسل طلبك مع تفاصيل براندك، لوغوك، وما تريده بالضبط",
        duration: "اليوم الأول",
    },
    {
        number: "02",
        icon: <PenTool size={28} color={GOLD} strokeWidth={1.8} />,
        title: "نجهز تصميم صفحتك",
        desc: "فريقنا يبني صفحتك بتصميم عصري مخصص لعلامتك التجارية",
        duration: "24 - 48 ساعة",
    },
    {
        number: "03",
        icon: <Rocket size={28} color={GOLD} strokeWidth={1.8} />,
        title: "نطلق الصفحة جاهزة",
        desc: "صفحتك تصبح حية على الإنترنت جاهزة لاستقبال الزبائن",
        duration: "خلال 72 ساعة",
    },
];

/* ─────────────────────────────────────────────
   Connector Arrow (desktop only)
   ───────────────────────────────────────────── */

function ConnectorArrow() {
    return (
        <div
            className="hidden lg:flex items-center flex-shrink-0"
            style={{ width: "60px", marginTop: "12px" }}
        >
            <div
                style={{
                    flex: 1,
                    borderTop: "2px dashed rgba(201,168,76,0.3)",
                }}
            />
            <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ flexShrink: 0, display: "flex", alignItems: "center" }}
            >
                <ChevronLeft size={24} color="rgba(201,168,76,0.6)" />
            </motion.div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Step Card
   ───────────────────────────────────────────── */

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
            whileHover={{ y: -6, borderColor: "rgba(201,168,76,0.4)" }}
            style={{
                flex: 1,
                backgroundColor: "#fff",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: "24px",
                padding: "32px 24px",
                textAlign: "center",
                position: "relative",
                cursor: "default",
                transition: "border-color 0.25s ease",
                boxShadow: "0 18px 45px rgba(32,26,10,0.06)",
            }}
        >
            {/* Big background step number */}
            <span
                style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    fontSize: "4rem",
                    fontWeight: 900,
                    color: "rgba(201,168,76,0.06)",
                    lineHeight: 1,
                    userSelect: "none",
                    fontFamily: "'Cairo', sans-serif",
                }}
            >
                {step.number}
            </span>

            {/* Duration badge */}
            <div
                style={{
                    position: "absolute",
                    top: "-12px",
                    right: "50%",
                    transform: "translateX(50%)",
                    background: "linear-gradient(135deg, #C9A84C, #F0C040)",
                    color: "#000",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    padding: "4px 14px",
                    borderRadius: "20px",
                    whiteSpace: "nowrap",
                    fontFamily: "'Cairo', sans-serif",
                }}
            >
                {step.duration}
            </div>

            {/* Icon circle */}
            <div
                style={{
                    width: "64px",
                    height: "64px",
                    background: "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))",
                    border: "1px solid rgba(201,168,76,0.3)",
                    borderRadius: "50%",
                    margin: "0 auto 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {step.icon}
            </div>

            {/* Title */}
            <p
                style={{
                    color: "#171717",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    fontFamily: "'Cairo', sans-serif",
                    marginBottom: "10px",
                }}
            >
                {step.title}
            </p>

            {/* Description */}
            <p
                style={{
                    color: "#666257",
                    fontSize: "0.88rem",
                    lineHeight: 1.7,
                    fontFamily: "'Cairo', sans-serif",
                }}
            >
                {step.desc}
            </p>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Main Section
   ───────────────────────────────────────────── */

export default function HowItWorks() {
    return (
        <section
            id="how-it-works"
            dir="rtl"
            style={{
                background: "linear-gradient(180deg, #f6f1e5 0%, #fbfaf6 100%)",
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
                        العملية بسيطة جداً

                    </motion.p>

                    {/* H2 */}
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{
                            color: "#171717",
                            fontWeight: 900,
                            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                            marginBottom: "12px",
                        }}
                    >
                        كيف نعمل معاً؟
                    </motion.h2>

                    {/* Gold underline */}
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

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        style={{ color: "#666257", fontSize: "1rem" }}
                    >
                        من أول رسالة إلى صفحة جاهزة للعمل
                    </motion.p>
                </div>

                {/* ── Steps Row ── */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "32px",
                    }}
                    className="lg:!flex-row lg:!items-center lg:!gap-0"
                >
                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            style={{ display: "contents" }}
                            className="lg:!flex lg:!flex-row lg:!items-center lg:!flex-1"
                        >
                            <div className="lg:flex-1">
                                <StepCard step={step} index={index} />
                            </div>
                            {index < steps.length - 1 && <ConnectorArrow />}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Responsive styles ── */}
            <style>{`
                @media (min-width: 1024px) {
                    .how-steps-row {
                        flex-direction: row !important;
                        align-items: center !important;
                        gap: 0 !important;
                    }
                }
            `}</style>
        </section>
    );
}
