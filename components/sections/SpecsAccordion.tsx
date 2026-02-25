"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   Specs Data
   ───────────────────────────────────────────── */

interface PricingRow {
    size: string;
    prices: number[];
}

interface SpecItem {
    id: number;
    titleFr: string;
    titleAr: string;
    icon: string;
    material: string;
    printing: string;
    minOrder: string;
    delay: string;
    customization: string;
    quantities: string[];
    pricing: PricingRow[];
}

const specs: SpecItem[] = [
    {
        id: 1,
        titleFr: "SAC SHOPPING",
        titleAr: "كيس التسوق",
        icon: "🛍",
        material: "بلاستيك HDPE مقوى",
        printing: "طباعة فليكسو 1 أو 2 لون",
        minOrder: "200 قطعة",
        delay: "5 – 10 أيام عمل",
        customization: "شعار + اسم المحل",
        quantities: ["+200", "+500", "+1000", "+5000"],
        pricing: [
            { size: "30/20 Cm", prices: [24, 18, 16, 15] },
            { size: "40/30 Cm", prices: [28, 23, 21, 24] },
            { size: "50/40 Cm", prices: [34, 28, 26, 19] },
            { size: "50/60 Cm", prices: [39, 33, 31, 30] },
        ],
    },
    {
        id: 2,
        titleFr: "SAC 5Kg",
        titleAr: "كيس 5 كغ",
        icon: "💪",
        material: "بلاستيك LDPE سماكة 5 ميكرون",
        printing: "طباعة فليكسو 1 أو 2 لون",
        minOrder: "200 قطعة",
        delay: "5 – 10 أيام عمل",
        customization: "شعار + اسم المحل",
        quantities: ["+200", "+500", "+1000", "+5000"],
        pricing: [
            { size: "30/20 Cm", prices: [24, 18, 16, 15] },
            { size: "40/30 Cm", prices: [28, 23, 21, 24] },
            { size: "50/40 Cm", prices: [34, 28, 26, 19] },
            { size: "50/60 Cm", prices: [39, 33, 31, 30] },
        ],
    },
    {
        id: 3,
        titleFr: "SAC PAPIER RIGIDE",
        titleAr: "كيس ريقيد",
        icon: "🎁",
        material: "ورق ريقيد كوشيه 200g",
        printing: "طباعة أوفست فاخرة متعددة الألوان",
        minOrder: "200 قطعة",
        delay: "7 – 12 أيام عمل",
        customization: "شعار + ألوان العلامة التجارية",
        quantities: ["+200", "+500", "+1000"],
        pricing: [
            { size: "14/18 Cm", prices: [60, 56, 64] },
            { size: "17/24 Cm", prices: [68, 64, 69] },
            { size: "35/25 Cm", prices: [80, 76, 109] },
            { size: "32/45 Cm", prices: [85, 81, 171] },
            { size: "35/50 Cm", prices: [90, 85, 178] },
        ],
    },
    {
        id: 4,
        titleFr: "SAC PAPIER CRAFT",
        titleAr: "كيس كرافت",
        icon: "📦",
        material: "ورق كرافت طبيعي 120g",
        printing: "طباعة فليكسو 1 أو 2 لون",
        minOrder: "200 قطعة",
        delay: "5 – 10 أيام عمل",
        customization: "شعار + اسم العلامة التجارية",
        quantities: ["+200", "+500", "+1000"],
        pricing: [
            { size: "20/25 Cm", prices: [60, 56, 56] },
            { size: "28/24 Cm", prices: [68, 64, 64] },
            { size: "28/33 Cm", prices: [80, 76, 76] },
            { size: "45/33 Cm", prices: [85, 81, 81] },
            { size: "45/44 Cm", prices: [90, 85, 82] },
        ],
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
   Info Pill
   ───────────────────────────────────────────── */

function InfoPill({ icon, label }: { icon: string; label: string }) {
    return (
        <span
            className="inline-flex items-center gap-2 text-[0.8rem] whitespace-nowrap"
            style={{
                background: "#2a2a2a",
                border: "1px solid #333",
                borderRadius: "20px",
                padding: "6px 14px",
                color: "#fff",
            }}
        >
            <span className="text-base">{icon}</span>
            {label}
        </span>
    );
}

/* ─────────────────────────────────────────────
   Pricing Table
   ───────────────────────────────────────────── */

function PricingTable({
    item,
}: {
    item: SpecItem;
}) {
    const lastQtyIdx = item.quantities.length - 1;

    const handleOrder = () => {
        document.getElementById("order-form")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <div className="mt-6">
            {/* Quick Info Bar */}
            <div className="flex flex-wrap gap-2 mb-6">
                <InfoPill icon="🏭" label={`المادة: ${item.material}`} />
                <InfoPill icon="🖨" label={`الطباعة: ${item.printing}`} />
                <InfoPill icon="📦" label={`أدنى كمية: ${item.minOrder}`} />
                <InfoPill icon="⏱" label={`مدة الإنجاز: ${item.delay}`} />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-[#333]">
                <table className="w-full text-center" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
                    {/* Header */}
                    <thead>
                        <tr>
                            <th
                                className="text-right px-4 py-3 text-sm font-bold"
                                style={{ color: "#C9A84C", background: "#1E1E1E" }}
                            >
                                المقاس / التايل
                            </th>
                            {item.quantities.map((qty, qi) => (
                                <th
                                    key={qty}
                                    className="px-4 py-3 text-sm font-bold"
                                    style={{
                                        color: "#C9A84C",
                                        background:
                                            qi === lastQtyIdx
                                                ? "rgba(201,168,76,0.1)"
                                                : "#1E1E1E",
                                        borderBottom:
                                            qi === lastQtyIdx
                                                ? "2px solid #C9A84C"
                                                : "none",
                                    }}
                                >
                                    {qty} قطعة
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {item.pricing.map((row, ri) => {
                            const minPrice = Math.min(...row.prices);

                            return (
                                <tr
                                    key={row.size}
                                    style={{
                                        background: ri % 2 === 0 ? "#252525" : "#2a2a2a",
                                    }}
                                >
                                    {/* Size cell */}
                                    <td className="text-right px-4 py-3">
                                        <span
                                            className="inline-block text-sm font-semibold text-white"
                                            style={{
                                                border: "1px solid rgba(201,168,76,0.27)",
                                                background: "rgba(201,168,76,0.08)",
                                                borderRadius: "8px",
                                                padding: "4px 12px",
                                            }}
                                        >
                                            {row.size}
                                        </span>
                                    </td>

                                    {/* Price cells */}
                                    {row.prices.map((price, pi) => {
                                        const isBest = price === minPrice;
                                        return (
                                            <td
                                                key={pi}
                                                className="px-4 py-3"
                                                style={{
                                                    background: isBest
                                                        ? "rgba(201,168,76,0.15)"
                                                        : "transparent",
                                                }}
                                            >
                                                <span
                                                    className="block text-sm"
                                                    style={{
                                                        color: isBest ? "#F0C040" : "#fff",
                                                        fontWeight: isBest ? 900 : 600,
                                                    }}
                                                >
                                                    {price} دج
                                                </span>
                                                {isBest && (
                                                    <span
                                                        className="block text-[9px] font-bold mt-1"
                                                        style={{ color: "#C9A84C" }}
                                                    >
                                                        الأفضل
                                                    </span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* CTA */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOrder}
                className="w-full mt-5 font-bold cursor-pointer transition-all duration-300"
                style={{
                    background: "#C9A84C",
                    color: "#000",
                    padding: "14px 0",
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "0.95rem",
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#A8832A";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 0 25px rgba(201,168,76,0.4)";
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#C9A84C";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
            >
                اطلب هذا المنتج
            </motion.button>

            {/* Note */}
            <p className="text-center text-[11px] text-[#666] mt-3 italic">
                * الأسعار بالدينار الجزائري للقطعة الواحدة — شاملة الطباعة
            </p>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Accordion Item
   ───────────────────────────────────────────── */

function AccordionItem({
    item,
    index,
    isOpen,
    onToggle,
}: {
    item: SpecItem;
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
                ease: "easeOut" as const,
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
                onMouseEnter={(e) => {
                    if (!isOpen) {
                        (e.currentTarget as HTMLDivElement).style.borderColor =
                            "rgba(201,168,76,0.5)";
                        (e.currentTarget as HTMLDivElement).style.background = "#242424";
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isOpen) {
                        (e.currentTarget as HTMLDivElement).style.borderColor =
                            "rgba(201,168,76,0.2)";
                        (e.currentTarget as HTMLDivElement).style.background = "#1E1E1E";
                    }
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
                    }}
                >
                    <div className="flex items-center gap-4">
                        <span className="text-[2rem] leading-none">{item.icon}</span>
                        <div className="flex flex-col items-start gap-1">
                            <span
                                className="text-[1.1rem] font-bold"
                                style={{ color: "#C9A84C" }}
                            >
                                {item.titleFr}
                            </span>
                            <span className="text-[0.9rem] text-white/70">
                                {item.titleAr}
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
                            <div style={{ padding: "0 28px 24px 28px" }}>
                                <PricingTable item={item} />
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
    const [activeId, setActiveId] = useState<number | null>(null);

    const toggle = (id: number) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <section
            id="specs"
            className="py-24 px-4"
            style={{ background: "#141414" }}
        >
            <div className="w-full mx-auto">
                {/* ── Section Header ── */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" as const }}
                        className="text-3xl md:text-4xl font-black text-white mb-3"
                    >
                        جدول الأسعار التفصيلي
                    </motion.h2>

                    {/* Gold underline accent */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.6,
                            delay: 0.2,
                            ease: "easeOut" as const,
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
                            ease: "easeOut" as const,
                        }}
                        className="text-[#888] text-base md:text-lg"
                    >
                        اضغط على المنتج لعرض جدول الأسعار الكامل
                    </motion.p>
                </div>

                {/* ── Accordion Items ── */}
                <div className="flex flex-col gap-4">
                    {specs.map((item, index) => (
                        <AccordionItem
                            key={item.id}
                            item={item}
                            index={index}
                            isOpen={activeId === item.id}
                            onToggle={() => toggle(item.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
