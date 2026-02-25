"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ─── Gold Particle Canvas ─── */
function GoldParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        interface Particle {
            x: number;
            y: number;
            size: number;
            speedY: number;
            speedX: number;
            opacity: number;
        }

        const particles: Particle[] = Array.from({ length: 60 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedY: -(Math.random() * 0.3 + 0.1),
            speedX: (Math.random() - 0.5) * 0.2,
            opacity: Math.random() * 0.3 + 0.4,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(201,168,76,${p.opacity})`;
                ctx.fill();

                p.y += p.speedY;
                p.x += p.speedX;

                if (p.y < -10) {
                    p.y = canvas.height + 10;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;
            }
            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
}

/* ─── 3D Bag Card ─── */
function BagCard({
    children,
    label,
    delay,
}: {
    children: React.ReactNode;
    label: string;
    delay: number;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            className="flex flex-col items-center gap-3"
            animate={
                hovered
                    ? { rotateY: 15, rotateX: -8 }
                    : { rotateY: 0, rotateX: 0 }
            }
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{ perspective: 800 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                className="animate-float"
                style={{ animationDelay: `${delay}s` }}
            >
                {children}
            </div>
            <span className="text-sm text-gold/80 font-semibold">{label}</span>
        </motion.div>
    );
}

/* ─── Bag Visuals ─── */
function WhiteBag() {
    return (
        <div className="relative w-[120px] h-[150px] md:w-[140px] md:h-[170px]">
            {/* Handle */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[18px] flex justify-between px-2 z-10">
                <div className="w-[3px] h-full rounded-full bg-[#8B7355]" />
                <div className="w-[3px] h-full rounded-full bg-[#8B7355]" />
            </div>
            <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-[50%] h-[12px] border-t-[3px] border-[#8B7355] rounded-t-full" />
            {/* Body */}
            <div
                className="absolute top-[16px] inset-x-0 bottom-0 rounded-b-xl overflow-hidden"
                style={{
                    background: "linear-gradient(145deg, #ffffff 0%, #f0ede6 100%)",
                    boxShadow: "6px 8px 24px rgba(0,0,0,0.25), inset -2px 0 6px rgba(0,0,0,0.04)",
                }}
            >
                {/* Side fold */}
                <div className="absolute right-0 top-0 w-[14%] h-full bg-gradient-to-l from-[#e0ddd6] to-transparent" />
                {/* Bottom fold */}
                <div className="absolute bottom-0 left-0 right-0 h-[12%] bg-gradient-to-t from-[#dad7d0] to-transparent" />
                {/* Logo area */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border-2 border-[#C9A84C]/40 flex items-center justify-center">
                        <span className="text-[#C9A84C] text-xs font-bold">LOGO</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BlackBag() {
    return (
        <div className="relative w-[120px] h-[150px] md:w-[140px] md:h-[170px]">
            {/* Handle */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[18px] flex justify-between px-2 z-10">
                <div className="w-[3px] h-full rounded-full bg-[#C9A84C]" />
                <div className="w-[3px] h-full rounded-full bg-[#C9A84C]" />
            </div>
            <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-[50%] h-[12px] border-t-[3px] border-[#C9A84C] rounded-t-full" />
            {/* Body */}
            <div
                className="absolute top-[16px] inset-x-0 bottom-0 rounded-b-xl overflow-hidden"
                style={{
                    background: "linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #111 100%)",
                    boxShadow: "6px 8px 24px rgba(0,0,0,0.4), inset -2px 0 6px rgba(255,255,255,0.03)",
                }}
            >
                {/* Side fold */}
                <div className="absolute right-0 top-0 w-[14%] h-full bg-gradient-to-l from-[#0d0d0d] to-transparent" />
                {/* Bottom fold */}
                <div className="absolute bottom-0 left-0 right-0 h-[12%] bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                {/* Gold logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-[2px] bg-[#C9A84C]/60 rounded" />
                        <span className="text-[#C9A84C] text-[10px] font-bold tracking-widest">PREMIUM</span>
                        <div className="w-8 h-[2px] bg-[#C9A84C]/60 rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function GlassBag() {
    return (
        <div className="relative w-[120px] h-[150px] md:w-[140px] md:h-[170px]">
            {/* Handle */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[18px] flex justify-between px-2 z-10">
                <div className="w-[3px] h-full rounded-full bg-white/30" />
                <div className="w-[3px] h-full rounded-full bg-white/30" />
            </div>
            <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-[50%] h-[12px] border-t-[3px] border-white/30 rounded-t-full" />
            {/* Body */}
            <div
                className="absolute top-[16px] inset-x-0 bottom-0 rounded-b-xl overflow-hidden"
                style={{
                    background: "linear-gradient(145deg, rgba(120,180,230,0.12) 0%, rgba(80,140,200,0.06) 100%)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "6px 8px 24px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.03)",
                }}
            >
                {/* Reflection */}
                <div className="absolute top-[10%] left-[10%] w-[30%] h-[50%] bg-gradient-to-br from-white/10 to-transparent rounded-lg rotate-[-12deg]" />
                {/* Logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/30 text-[10px] font-bold tracking-widest">ECO</span>
                </div>
            </div>
        </div>
    );
}

/* ─── Main Hero Section ─── */
export default function HeroSection() {
    const scrollToForm = () => {
        document.getElementById("order-form")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const leftVariants = {
        hidden: { opacity: 0, x: -60 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" as const, delay: 0.2 },
        },
    };

    const rightVariants = {
        hidden: { opacity: 0, x: 60 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" as const, delay: 0.4 },
        },
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-16 md:py-0"
            style={{
                background: "linear-gradient(180deg, #000000 0%, #1C1C1C 100%)",
            }}
        >
            {/* Particle Canvas */}
            <GoldParticles />

            {/* Radial glow behind container */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
                    zIndex: 1,
                }}
            />

            {/* Main Glass Container */}
            <div
                className="relative z-10 w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 md:gap-10 lg:gap-6 items-center"
                style={{
                    padding: "clamp(32px, 5vw, 60px)",
                    borderRadius: "48px",
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(201,168,76,0.15)",
                    boxShadow: "0 8px 60px rgba(0,0,0,0.5)",
                }}
            >
                {/* ─── Left Column — Content ─── */}
                <motion.div
                    className="flex flex-col gap-6 text-right"
                    variants={leftVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Badge */}
                    <div className="inline-flex self-start">
                        <span
                            className="inline-block text-sm font-semibold px-5 py-2 rounded-full"
                            style={{
                                color: "#C9A84C",
                                border: "1.5px solid rgba(201,168,76,0.5)",
                                background: "rgba(201,168,76,0.06)",
                            }}
                        >
                            ✦ جودة احترافية مضمونة
                        </span>
                    </div>

                    {/* H1 */}
                    <h1
                        className="font-black text-white leading-[1.3]"
                        style={{
                            fontSize: "clamp(2rem, 7vw, 4rem)",
                            textShadow: "0 0 40px rgba(201,168,76,0.2)",
                        }}
                    >
                        صمّم أكياس علامتك
                        <br />
                        التجارية <span className="text-gold">باحترافية</span>
                    </h1>

                    {/* Paragraph */}
                    <p
                        className="leading-relaxed"
                        style={{
                            color: "#A0A0A0",
                            fontSize: "1.1rem",
                            maxWidth: "480px",
                        }}
                    >
                        نوفر جميع أنواع الأكياس المطبوعة بجودة عالية مع إمكانية تخصيص
                        المقاسات والطباعة.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 mt-2">
                        {/* Gold CTA */}
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={scrollToForm}
                            className="font-bold cursor-pointer transition-all duration-300"
                            style={{
                                background: "#C9A84C",
                                color: "#000",
                                padding: "14px 32px",
                                borderRadius: "12px",
                                border: "none",
                                fontSize: "1rem",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = "#A8832A";
                                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                                    "0 0 25px rgba(201,168,76,0.5)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = "#C9A84C";
                                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                            }}
                        >
                            اطلب عرض سعر
                        </motion.button>

                        {/* WhatsApp button */}
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() =>
                                window.open("https://wa.me/213777640477", "_blank")
                            }
                            className="font-bold cursor-pointer transition-all duration-300"
                            style={{
                                background: "transparent",
                                color: "#fff",
                                padding: "14px 32px",
                                borderRadius: "12px",
                                border: "1.5px solid #fff",
                                fontSize: "1rem",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = "#fff";
                                (e.currentTarget as HTMLButtonElement).style.color = "#000";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                            }}
                        >
                            تواصل عبر واتساب 💬
                        </motion.button>
                    </div>
                </motion.div>

                {/* ─── Right Column — 3D Bag Visuals ─── */}
                <motion.div
                    className="flex items-center justify-center"
                    variants={rightVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="relative w-full max-w-[400px] h-[350px] md:h-[400px]">
                        {/* Bag 1 — White — top-right */}
                        <div className="absolute top-0 right-0 md:right-4">
                            <BagCard label="كيس كلاسيكي" delay={0}>
                                <WhiteBag />
                            </BagCard>
                        </div>

                        {/* Bag 2 — Black — bottom-left */}
                        <div className="absolute bottom-0 left-0 md:left-4">
                            <BagCard label="كيس فاخر" delay={0.8}>
                                <BlackBag />
                            </BagCard>
                        </div>

                        {/* Bag 3 — Glass — center-right */}
                        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/4">
                            <BagCard label="كيس شفاف" delay={1.6}>
                                <GlassBag />
                            </BagCard>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
