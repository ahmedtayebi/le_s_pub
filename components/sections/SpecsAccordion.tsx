"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Products Data
   ───────────────────────────────────────────── */

interface ProductItem {
    id: string;
    name: string;
    arabicName: string;
    icon: string;
    image: string;
}

const products: ProductItem[] = [
    {
        id: "sac-shopping",
        name: "SAC SHOPPING",
        arabicName: "كيس التسوق",
        icon: "/sac_shopping-removebg-preview.png",
        image: "/sacshop.jpg",
    },
    {
        id: "sac-papier",
        name: "SAC PAPIER CRAFT",
        arabicName: "كيس ورق كرافت",
        icon: "/sac_craft-removebg-preview.png",
        image: "/papcraft.jpg",
    },
    {
        id: "sac-5kg",
        name: "SAC 5KG",
        arabicName: "كيس 5 كغ",
        icon: "/sac_5kg-removebg-preview.png",
        image: "/sac5kg.jpg",
    },
    {
        id: "sac-rigide",
        name: "SAC RIGIDE",
        arabicName: "كيس ريقيد",
        icon: "/sac_riged-removebg-preview.png",
        image: "/sacpap.jpg",
    },
    {
        id: "sac-epack",
        name: "E-PACK",
        arabicName: "إي باك",
        icon: "/sac_delivration-removebg-preview.png",
        image: "/sacdel.jpg",
    },
];

/* ─────────────────────────────────────────────
   Chevron Icon
   ───────────────────────────────────────────── */

function ChevronDown({ open }: { open: boolean }) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-400"
            style={{
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                flexShrink: 0,
            }}
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

/* ─────────────────────────────────────────────
   Accordion Item
   ───────────────────────────────────────────── */

function AccordionItem({
    product,
    index,
    isOpen,
    onToggle,
}: {
    product: ProductItem;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.45,
                ease: "easeOut",
                delay: index * 0.08,
            }}
        >
            <div
                className="rounded-[16px] overflow-hidden transition-all duration-300"
                style={{
                    background: "#1E1E1E",
                    border: isOpen
                        ? "1px solid rgba(201,168,76,0.5)"
                        : "1px solid rgba(201,168,76,0.2)",
                }}
            >
                {/* Header */}
                <button
                    onClick={onToggle}
                    className="w-full flex items-center justify-between cursor-pointer"
                    style={{
                        padding: "20px 28px",
                        background: "transparent",
                        border: "none",
                        outline: "none",
                    }}
                >
                    <div className="flex items-center gap-4">
                        {/* Product Thumbnail */}
                        <div
                            style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "10px",
                                overflow: "hidden",
                                border: "1px solid rgba(255,255,255,0.1)",
                                background: "rgba(255,255,255,0.05)",
                                flexShrink: 0,
                            }}
                        >
                            <img
                                src={product.icon}
                                alt=""
                                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src =
                                        "https://placehold.co/100x100/1E1E1E/C9A84C?text=P";
                                }}
                            />
                        </div>

                        <div className="flex flex-col items-start gap-1">
                            <span
                                className="text-[1.1rem] font-bold"
                                style={{ color: "#C9A84C" }}
                            >
                                {product.name}
                            </span>
                            <span className="text-[0.9rem] text-white/70">
                                {product.arabicName}
                            </span>
                        </div>
                    </div>
                    <ChevronDown open={isOpen} />
                </button>

                {/* Content */}
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.04, 0.62, 0.23, 0.98],
                            }}
                            style={{ overflow: "hidden" }}
                        >
                            <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{
                                        width: "100%",
                                        maxWidth: "500px",
                                        borderRadius: "16px",
                                        boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                                        objectFit: "contain",
                                    }}
                                    onError={(e) => {
                                        // Placeholder logic if image fails (since they are placeholders)
                                        (e.currentTarget as HTMLImageElement).src = "https://placehold.co/500x500/1E1E1E/C9A84C?text=Product+Image";
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Specs Accordion Section
   ───────────────────────────────────────────── */

export default function SpecsAccordion() {
    const [activeId, setActiveId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <section
            id="specs"
            className="py-24 px-4"
            style={{ background: "#141414" }}
        >
            <div className="w-full mx-auto max-w-[1100px]">
                {/* ── Section Header ── */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-3xl md:text-4xl font-black text-white mb-3"
                    >
                        استعرض منتجاتنا
                    </motion.h2>

                    {/* Gold underline accent */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.6,
                            delay: 0.2,
                            ease: "easeOut",
                        }}
                        className="mx-auto mb-4"
                        style={{
                            width: "60px",
                            height: "4px",
                            borderRadius: "2px",
                            background: "linear-gradient(90deg, #C9A84C, #F0C040)",
                            transformOrigin: "center",
                        }}
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.5,
                            delay: 0.3,
                            ease: "easeOut",
                        }}
                        className="text-[#888] text-base md:text-lg"
                    >
                        اضغط على المنتج لمشاهدة التفاصيل
                    </motion.p>
                </div>

                {/* ── Accordion Items ── */}
                <div className="flex flex-col gap-4">
                    {products.map((product, index) => (
                        <AccordionItem
                            key={product.id}
                            product={product}
                            index={index}
                            isOpen={activeId === product.id}
                            onToggle={() => toggle(product.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
