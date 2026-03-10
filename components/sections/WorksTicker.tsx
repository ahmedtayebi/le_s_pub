"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Place your images in: public/works/work1.jpg, work2.jpg, work3.jpg, work4.jpg

const works = [
    { src: "/papcraft.jpg", alt: "Boutique Adel 02" },
    { src: "/sacdel.jpg", alt: "Boutique Adel 02 or" },
    { src: "/.jpg", alt: "Boutique Adel 02 noir" },
    { src: "/work4.jpg", alt: "Boutique Adel 02 ext" },
];

const repeated = [...works, ...works, ...works, ...works];

export default function WorksTicker() {
    const [paused, setPaused] = useState(false);

    return (
        <section
            style={{
                background: "#0a0a0a",
                padding: "32px 0",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <div
                style={{
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                    height: "240px",
                }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {/* FADE EDGES */}
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: "120px",
                        zIndex: 2,
                        background: "linear-gradient(to right, #0a0a0a, transparent)",
                        pointerEvents: "none",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: "120px",
                        zIndex: 2,
                        background: "linear-gradient(to left, #0a0a0a, transparent)",
                        pointerEvents: "none",
                    }}
                />

                {/* TICKER STRIP */}
                <motion.div
                    className="flex gap-[10px]"
                    style={{ width: "fit-content" }}
                    animate={{ x: paused ? undefined : [0, "-50%"] }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop",
                    }}
                >
                    {repeated.map((work, idx) => (
                        <div
                            key={idx}
                            style={{
                                width: "180px",
                                height: "240px",
                                flexShrink: 0,
                                borderRadius: "14px",
                                overflow: "hidden",
                                position: "relative",
                                cursor: "pointer",
                                border: "1px solid rgba(201,168,76,0.1)",
                                transition: "border-color 0.4s ease",
                            }}
                            onMouseEnter={(e) => {
                                const img = e.currentTarget.querySelector("img");
                                if (img) img.style.transform = "scale(1.05)";
                                e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
                                const overlay = e.currentTarget.querySelector(".overlay") as HTMLElement;
                                if (overlay) overlay.style.opacity = "1";
                            }}
                            onMouseLeave={(e) => {
                                const img = e.currentTarget.querySelector("img");
                                if (img) img.style.transform = "scale(1)";
                                e.currentTarget.style.borderColor = "rgba(201,168,76,0.1)";
                                const overlay = e.currentTarget.querySelector(".overlay") as HTMLElement;
                                if (overlay) overlay.style.opacity = "0";
                            }}
                        >
                            <img
                                src={work.src}
                                alt={work.alt}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                    transition: "transform 0.4s ease",
                                }}
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src = `https://placehold.co/180x240/1E1E1E/C9A84C?text=${work.alt}`;
                                }}
                            />

                            <div
                                className="overlay"
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                                    opacity: 0,
                                    transition: "opacity 0.4s ease",
                                    display: "flex",
                                    alignItems: "flex-end",
                                    padding: "16px",
                                    pointerEvents: "none",
                                }}
                            >
                                <span style={{ color: "white", fontSize: "0.85rem", fontWeight: 600 }}>
                                    {work.alt}
                                </span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
