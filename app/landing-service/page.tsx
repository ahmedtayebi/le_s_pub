"use client";

import Navbar from "@/components/sections/Navbar";
import HeroService from "@/components/landing-service/HeroService";
import HowItWorks from "@/components/landing-service/HowItWorks";
import Portfolio from "@/components/landing-service/Portfolio";
import ServiceOrderForm from "@/components/landing-service/ServiceOrderForm";
import FinalCTA from "@/components/landing-service/FinalCTA";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// ═══════════════════════════════════════════════════════════════════════════════
// INLINE SECTIONS — Problem/Solution, Features, HowItWorks, Portfolio,
// ServiceOrderForm, FinalCTA are all defined here in one file for simplicity.
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Shared ───────────────────────────────────────────────────────────────────

const GOLD = "#C9A84C";
const GOLD_GRADIENT = "linear-gradient(135deg, #C9A84C, #F0C040)";

function SectionHeading({
    title,
    subtitle,
    light = false,
}: {
    title: string;
    subtitle: string;
    light?: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: "center", marginBottom: 56, fontFamily: "Cairo, sans-serif" }}
        >
            <h2
                style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 900,
                    color: light ? "#fff" : "#fff",
                    margin: "0 0 12px",
                }}
            >
                {title}
            </h2>
            <p style={{ color: "#888", fontSize: "1.05rem", maxWidth: 560, margin: "0 auto" }}>
                {subtitle}
            </p>
            <div
                style={{
                    width: 60,
                    height: 3,
                    borderRadius: 2,
                    background: GOLD_GRADIENT,
                    margin: "20px auto 0",
                }}
            />
        </motion.div>
    );
}

// ─── Problem / Solution ───────────────────────────────────────────────────────

function ProblemSolution() {
    const problems = [
        { emoji: "😩", text: "ما عندكش موقع واضح لعرض خدماتك" },
        { emoji: "📉", text: "عملاؤك ما يلقاوكش بسهولة أونلاين" },
        { emoji: "😕", text: "السوشيال ميديا وحدها ما تكفيش" },
    ];
    const solutions = [
        { emoji: "✅", text: "صفحة هبوط احترافية على اسم براندك" },
        { emoji: "📲", text: "عميلك يلقاك ويطلب مباشرة" },
        { emoji: "🚀", text: "حضور رقمي يرفع مبيعاتك" },
    ];

    return (
        <section
            id="problem-solution"
            dir="rtl"
            style={{
                padding: "100px 24px",
                background: "#000",
                fontFamily: "Cairo, sans-serif",
            }}
        >
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                <SectionHeading
                    title="هل عندك واحد من هاد المشاكل؟"
                    subtitle="أغلب البراندات الجزائرية تعاني من نفس التحديات"
                />
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 40,
                    }}
                    className="ps-grid"
                >
                    {/* Problems */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{
                            background: "rgba(255,50,50,0.04)",
                            border: "1px solid rgba(255,50,50,0.15)",
                            borderRadius: 20,
                            padding: 32,
                        }}
                    >
                        <h3 style={{ color: "#ff6b6b", fontSize: "1.15rem", fontWeight: 800, marginBottom: 20 }}>
                            ❌ المشكلة
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {problems.map((p, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <span style={{ fontSize: "1.3rem" }}>{p.emoji}</span>
                                    <span style={{ color: "#aaa", fontSize: "0.95rem" }}>{p.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Solutions */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{
                            background: "rgba(201,168,76,0.04)",
                            border: "1px solid rgba(201,168,76,0.2)",
                            borderRadius: 20,
                            padding: 32,
                        }}
                    >
                        <h3 style={{ color: GOLD, fontSize: "1.15rem", fontWeight: 800, marginBottom: 20 }}>
                            ✨ الحل مع Le S Publicité
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {solutions.map((s, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <span style={{ fontSize: "1.3rem" }}>{s.emoji}</span>
                                    <span style={{ color: "#ccc", fontSize: "0.95rem" }}>{s.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .ps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}

// ─── Features ─────────────────────────────────────────────────────────────────

function Features() {
    const features = [
        {
            icon: "🎨",
            title: "تصميم فريد",
            desc: "تصميم مخصص يعكس هوية علامتك — مش قالب جاهز",
        },
        {
            icon: "📱",
            title: "متجاوب مع الموبايل",
            desc: "صفحتك تظهر ممتازة على كل الأجهزة بدون استثناء",
        },
        {
            icon: "⚡",
            title: "سرعة تحميل عالية",
            desc: "أداء سريع لضمان أفضل تجربة لزوار صفحتك",
        },
        {
            icon: "🔗",
            title: "ربط السوشيال ميديا",
            desc: "نربط صفحتك بكل حساباتك لتكون مرجعك الرقمي الأول",
        },
        {
            icon: "📊",
            title: "نموذج طلب مدمج",
            desc: "يقدر عميلك يطلب مباشرة من الصفحة — بدون تعقيدات",
        },
        {
            icon: "🛡️",
            title: "دعم فني مستمر",
            desc: "بعد التسليم نبقى معاك لأي تعديل أو تحديث تحتاجه",
        },
    ];

    return (
        <section
            dir="rtl"
            style={{
                padding: "100px 24px",
                background: "#0a0a0a",
                fontFamily: "Cairo, sans-serif",
            }}
        >
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <SectionHeading
                    title="واش رايح تاخد؟"
                    subtitle="كل اللي تحتاجه في صفحة هبوط ناجحة"
                />
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 20,
                    }}
                    className="features-grid"
                >
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            whileHover={{
                                borderColor: "rgba(201,168,76,0.4)",
                                y: -4,
                            }}
                            style={{
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                borderRadius: 18,
                                padding: 28,
                                transition: "border-color 0.3s",
                            }}
                        >
                            <div
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 14,
                                    background: "linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))",
                                    border: "1px solid rgba(201,168,76,0.2)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.5rem",
                                    marginBottom: 18,
                                }}
                            >
                                {f.icon}
                            </div>
                            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.05rem", marginBottom: 8 }}>
                                {f.title}
                            </h3>
                            <p style={{ color: "#777", fontSize: "0.88rem", lineHeight: 1.7, margin: 0 }}>
                                {f.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}


// ─── How It Works & Portfolio ─────────────────────────────────────────────────
// Imported from components/landing-service/HowItWorks.tsx
// Imported from components/landing-service/Portfolio.tsx



// ─── Service Order Form & Final CTA ──────────────────────────────────────────
// Imported from components/landing-service/ServiceOrderForm.tsx
// Imported from components/landing-service/FinalCTA.tsx


// ─── Footer (minimal for service page) ────────────────────────────────────────

function ServiceFooter() {
    const router = useRouter();

    return (
        <footer
            dir="rtl"
            style={{
                padding: "30px 24px",
                background: "#000",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                fontFamily: "Cairo, sans-serif",
                textAlign: "center",
            }}
        >
            <button
                onClick={() => router.push("/")}
                style={{
                    background: "none",
                    border: "none",
                    color: GOLD,
                    cursor: "pointer",
                    fontSize: "0.88rem",
                    fontFamily: "Cairo, sans-serif",
                    marginBottom: 8,
                }}
            >
                ← العودة للصفحة الرئيسية
            </button>
            <p style={{ color: "#444", fontSize: "0.8rem", margin: 0 }}>
                © {new Date().getFullYear()} Le S Publicité — جميع الحقوق محفوظة
            </p>
        </footer>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function LandingServicePage() {
    return (
        <>
            <Navbar />
            <HeroService />
            <ProblemSolution />
            <Features />
            <HowItWorks />
            <Portfolio />
            <ServiceOrderForm />
            <FinalCTA />
            <ServiceFooter />
        </>
    );
}
