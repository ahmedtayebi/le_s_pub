"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
                            اطلب تصميمك الان
                        </motion.button>

                        {/* Prices button */}
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                                document.getElementById("products")?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                });
                            }}
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
                            استعرض الأسعار ✦
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
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                            height: "500px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {/* Layer 1 — Gold radial glow BEHIND image */}
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "radial-gradient(ellipse 80% 70% at 50% 60%, rgba(201,168,76,0.18) 0%, transparent 70%)",
                                zIndex: 1,
                            }}
                        />

                        {/* Layer 3 — THE MAIN PRODUCT IMAGE */}
                        <motion.div
                            style={{
                                position: "relative",
                                zIndex: 2,
                                width: "100%",
                                height: "100%",
                            }}
                            initial={{ opacity: 0, scale: 0.85, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                                duration: 0.9,
                                ease: [0.22, 1, 0.36, 1],
                                delay: 0.5,
                            }}
                        >
                            {/* Continuous slow float animation wrapper */}
                            <motion.div
                                style={{ width: "100%", height: "100%", position: "relative" }}
                                animate={{ y: [0, -14, 0] }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <Image
                                    src="/cover.png"
                                    alt="Le S Publicité — أكياس مطبوعة فاخرة"
                                    fill
                                    priority
                                    style={{
                                        objectFit: "contain",
                                        objectPosition: "center",
                                        filter:
                                            "drop-shadow(0 30px 60px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(201,168,76,0.15))",
                                    }}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Layer 5 — Floating gold badge top-right */}
                        {/* <motion.div
                            style={{
                                position: "absolute",
                                top: "12%",
                                right: "5%",
                                zIndex: 4,
                                background: "rgba(0,0,0,0.7)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(201,168,76,0.4)",
                                borderRadius: "20px",
                                padding: "8px 16px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                        >
                            <div
                                style={{
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    background: "#C9A84C",
                                    boxShadow: "0 0 8px rgba(201,168,76,0.8)",
                                }}
                            />
                            <span
                                style={{
                                    color: "#C9A84C",
                                    fontSize: "0.78rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.5px",
                                }}
                            >
                                جودة مضمونة 100%
                            </span>
                        </motion.div> */}

                        {/* Layer 6 — Floating product count badge bottom-left */}
                        {/* <motion.div
                            style={{
                                position: "absolute",
                                bottom: "14%",
                                left: "5%",
                                zIndex: 4,
                                background: "rgba(201,168,76,0.12)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(201,168,76,0.3)",
                                borderRadius: "16px",
                                padding: "10px 18px",
                                textAlign: "center",
                            }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.4, duration: 0.6 }}
                        >
                            <div
                                style={{
                                    color: "#C9A84C",
                                    fontSize: "1.4rem",
                                    fontWeight: 900,
                                    lineHeight: 1,
                                }}
                            >
                                5
                            </div>
                            <div
                                style={{
                                    color: "#888",
                                    fontSize: "0.72rem",
                                    marginTop: "2px",
                                }}
                            >
                                أنواع من الأكياس
                            </div>
                        </motion.div> */}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
