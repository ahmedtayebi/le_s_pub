"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Product Data
   ───────────────────────────────────────────── */

interface SizeOption {
    label: string;
    prices: Record<number, number>;
}

interface Product {
    id: number;
    titleFr: string;
    titleAr: string;
    image: string;
    imageBackground: string;
    glowOverlay: string;
    badgeColor: string;
    features: string[];
    sizes: SizeOption[];
    quantities: number[];
}

const products: Product[] = [
    {
        id: 1,
        titleFr: "SAC SHOPPING",
        titleAr: "كيس التسوق",
        image: "/sac_shopping-removebg-preview.png",
        imageBackground: "linear-gradient(135deg, #fbd59bff 0%, #c09d5bff 40%, #b08f4eff 100%)",
        glowOverlay: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,255,255,0.8) 0%, transparent 70%)",
        badgeColor: "#C9A84C",
        features: [
            "مقاوم وخفيف الوزن",
            "طباعة شعارك بدقة عالية",
            "مناسب للمحلات التجارية",
        ],
        sizes: [
            { label: "30/20 Cm", prices: { 200: 24, 500: 18, 1000: 16, 5000: 15 } },
            { label: "40/30 Cm", prices: { 200: 28, 500: 23, 1000: 21, 5000: 24 } },
            { label: "50/40 Cm", prices: { 200: 34, 500: 28, 1000: 26, 5000: 19 } },
            { label: "50/60 Cm", prices: { 200: 39, 500: 33, 1000: 31, 5000: 30 } },
        ],
        quantities: [200, 500, 1000, 5000],
    },
    {
        id: 2,
        titleFr: "SAC 5Kg",
        titleAr: "كيس 5 كغ",
        image: "/sac_5kg-removebg-preview.png",
        imageBackground: "linear-gradient(135deg, #7575afff 0%, #b2c7feff 50%, #0f3460 100%)",
        glowOverlay: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(247, 215, 126, 0.25) 0%, transparent 70%)",
        badgeColor: "#C9A84C",
        features: [
            "تحمل حتى 5 كيلوغرام",
            "مقاوم للتمزق",
            "مثالي للسوبرماركت والمحلات",
        ],
        sizes: [
            { label: "30/20 Cm", prices: { 200: 24, 500: 18, 1000: 16, 5000: 15 } },
            { label: "40/30 Cm", prices: { 200: 28, 500: 23, 1000: 21, 5000: 24 } },
            { label: "50/40 Cm", prices: { 200: 34, 500: 28, 1000: 26, 5000: 19 } },
            { label: "50/60 Cm", prices: { 200: 39, 500: 33, 1000: 31, 5000: 30 } },
        ],
        quantities: [200, 500, 1000, 5000],
    },
    {
        id: 3,
        titleFr: "SAC PAPIER RIGIDE",
        titleAr: "كيس ريقيد",
        image: "/sac_riged-removebg-preview.png",
        imageBackground: "linear-gradient(145deg, #fae5c2ff 0%, #f5ede0 40%, #dbbe97ff 100%)",
        glowOverlay: "radial-gradient(ellipse 65% 55% at 50% 35%, rgba(255,252,245,0.9) 0%, transparent 70%)",
        badgeColor: "#C9A84C",
        features: [
            "ورق ريقيد فاخر بمقابض",
            "مظهر راقٍ يعكس قيمة علامتك",
            "مناسب للمتاجر الفاخرة والهدايا",
        ],
        sizes: [
            { label: "14/18 Cm", prices: { 200: 60, 500: 56, 1000: 64 } },
            { label: "17/24 Cm", prices: { 200: 68, 500: 64, 1000: 69 } },
            { label: "35/25 Cm", prices: { 200: 80, 500: 76, 1000: 109 } },
            { label: "32/45 Cm", prices: { 200: 85, 500: 81, 1000: 171 } },
            { label: "35/50 Cm", prices: { 200: 90, 500: 85, 1000: 178 } },
        ],
        quantities: [200, 500, 1000],
    },
    {
        id: 4,
        titleFr: "SAC PAPIER CRAFT",
        titleAr: "كيس كرافت",
        image: "/sac_craft-removebg-preview.png",
        imageBackground: "linear-gradient(135deg, #d7c5b0ff 0%, #cdbcacff 50%, #f9d5aaff 100%)",
        glowOverlay: "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(201,168,76,0.3) 0%, rgba(139,105,20,0.15) 50%, transparent 70%)",
        badgeColor: "#8B6914",
        features: [
            "ورق كرافت طبيعي 100%",
            "مستدام وصديق للبيئة",
            "مناسب للمخابز والمحلات الطبيعية",
        ],
        sizes: [
            { label: "20/25 Cm", prices: { 200: 60, 500: 56, 1000: 56 } },
            { label: "28/24 Cm", prices: { 200: 68, 500: 64, 1000: 64 } },
            { label: "28/33 Cm", prices: { 200: 80, 500: 76, 1000: 76 } },
            { label: "45/33 Cm", prices: { 200: 85, 500: 81, 1000: 81 } },
            { label: "45/44 Cm", prices: { 200: 90, 500: 85, 1000: 82 } },
        ],
        quantities: [200, 500, 1000],
    },
    {
        id: 5,
        titleFr: "SAC DE LIVRAISON",
        titleAr: "كيس التوصيل",
        image: "/sac_delivration-removebg-preview.png",
        imageBackground: "linear-gradient(135deg, #7e7d7dff 0%, #e0e0e0ff 60%, #1a1a1a 100%)",
        glowOverlay: "linear-gradient(225deg, rgba(201,168,76,0.2) 0%, transparent 50%)",
        badgeColor: "#C9A84C",
        features: [
            "يغلق بالشريط اللاسق — E-PACK",
            "مقاوم للتمزق والرطوبة",
            "مثالي لشركات التوصيل والتجارة الإلكترونية"
        ],
        sizes: [
            { label: "20/30 Cm", prices: { 200: 35, 500: 22, 1000: 20 } },
            { label: "30/40 Cm", prices: { 200: 40, 500: 28, 1000: 26 } },
            { label: "40/50 Cm", prices: { 200: 45, 500: 34, 1000: 31 } }
        ],
        quantities: [200, 500, 1000]
    },
];

/* ─────────────────────────────────────────────
   Single Product Card
   ───────────────────────────────────────────── */

function ProductCard({
    product,
    index,
    isLast,
}: {
    product: Product;
    index: number;
    isLast?: boolean;
}) {
    const [selectedSize, setSelectedSize] = useState(product.sizes[0].label);
    const [selectedQty, setSelectedQty] = useState(product.quantities[0]);

    const sizeObj = product.sizes.find((s) => s.label === selectedSize)!;
    const currentPrice = sizeObj.prices[selectedQty] ?? 0;
    const totalPrice = currentPrice * selectedQty;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                ease: "easeOut" as const,
                delay: index * 0.1,
            }}
            whileHover={{ y: -8 }}
            className={`group rounded-[24px] bg-white overflow-hidden transition-shadow duration-300 ${isLast ? "lg:col-start-2" : ""}`}
            style={{
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 16px 48px rgba(0,0,0,0.14)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 4px 24px rgba(0,0,0,0.07)";
            }}
        >
            {/* ── Card Top Visual (Product Image) ── */}
            <div
                style={{
                    background: product.imageBackground,
                    position: 'relative',
                    height: '260px',
                    borderRadius: '16px 16px 0 0',
                    overflow: 'hidden'
                }}
            >
                {/* Glow overlay behind image */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: product.glowOverlay,
                    zIndex: 1
                }} />

                {/* Product image on top of glow */}
                <motion.div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        zIndex: 2
                    }}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <Image
                        src={product.image}
                        alt={product.titleFr}
                        fill
                        style={{
                            objectFit: 'contain',
                            objectPosition: 'center',
                            padding: '1px',
                            filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.35))'
                        }}
                    />
                </motion.div>

                {/* Bottom badge */}
                <div style={{
                    position: 'absolute',
                    bottom: 12,
                    right: 16,
                    zIndex: 3,
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(201,168,76,0.5)',
                    borderRadius: 8,
                    padding: '4px 12px',
                    color: '#C9A84C',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    letterSpacing: '1.5px'
                }}>
                    {product.titleFr}
                </div>
            </div>

            {/* ── Card Body ── */}
            <div className="p-7 flex flex-col gap-5">
                {/* Arabic Title */}
                <h3 className="text-xl font-black text-[#1C1C1C]">
                    {product.titleAr}
                </h3>

                {/* Features */}
                <ul className="flex flex-col gap-2 text-right">
                    {product.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-[#555]">
                            <span className="text-[#C9A84C] font-bold text-base">✓</span>
                            {f}
                        </li>
                    ))}
                </ul>

                {/* ── STEP 1: Size Selector ── */}
                <div>
                    <label className="block text-xs font-bold text-[#888] mb-2">
                        اختر المقاس
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => {
                            const isActive = selectedSize === size.label;
                            return (
                                <motion.button
                                    key={size.label}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setSelectedSize(size.label);
                                        /* ensure qty is valid for this size */
                                        if (!(selectedQty in size.prices)) {
                                            const validQties = Object.keys(size.prices).map(Number);
                                            setSelectedQty(validQties[0]);
                                        }
                                    }}
                                    className="cursor-pointer text-xs font-semibold transition-all duration-200"
                                    style={{
                                        padding: "6px 14px",
                                        borderRadius: "20px",
                                        border: isActive
                                            ? "1.5px solid #C9A84C"
                                            : "1.5px solid #E0E0E0",
                                        background: isActive ? "#C9A84C" : "#fff",
                                        color: isActive ? "#000" : "#444",
                                        fontWeight: isActive ? 700 : 500,
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive)
                                            (e.currentTarget as HTMLButtonElement).style.borderColor =
                                                "#C9A84C";
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive)
                                            (e.currentTarget as HTMLButtonElement).style.borderColor =
                                                "#E0E0E0";
                                    }}
                                >
                                    {size.label}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* ── STEP 2: Quantity Selector ── */}
                <div>
                    <label className="block text-xs font-bold text-[#888] mb-2">
                        اختر الكمية
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {product.quantities.map((qty) => {
                            const isActive = selectedQty === qty;
                            /* only show qty if available for selected size */
                            if (!(qty in sizeObj.prices)) return null;
                            return (
                                <motion.button
                                    key={qty}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedQty(qty)}
                                    className="cursor-pointer text-xs font-semibold transition-all duration-200"
                                    style={{
                                        padding: "6px 14px",
                                        borderRadius: "20px",
                                        border: isActive
                                            ? "1.5px solid #C9A84C"
                                            : "1.5px solid #E0E0E0",
                                        background: isActive ? "#C9A84C" : "#fff",
                                        color: isActive ? "#000" : "#444",
                                        fontWeight: isActive ? 700 : 500,
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive)
                                            (e.currentTarget as HTMLButtonElement).style.borderColor =
                                                "#C9A84C";
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive)
                                            (e.currentTarget as HTMLButtonElement).style.borderColor =
                                                "#E0E0E0";
                                    }}
                                >
                                    +{qty}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* ── STEP 3: Live Price Display ── */}
                <div
                    className="flex items-center justify-between gap-4"
                    style={{
                        background: "linear-gradient(135deg, #C9A84C22, #F0C04011)",
                        border: "1px solid #C9A84C44",
                        borderRadius: "14px",
                        padding: "16px",
                    }}
                >
                    {/* Right side — price info */}
                    <div className="flex flex-col gap-1">
                        <span className="text-[11px] text-[#888]">
                            السعر للقطعة الواحدة
                        </span>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentPrice}
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.2 }}
                                className="font-black leading-none"
                                style={{ fontSize: "2.2rem", color: "#C9A84C" }}
                            >
                                {currentPrice} دج
                            </motion.span>
                        </AnimatePresence>
                        <span className="text-[11px] text-[#999]">
                            المجموع التقريبي:{" "}
                            <span className="font-bold text-[#666]">
                                {totalPrice} دج
                            </span>
                        </span>
                    </div>

                    {/* Left side — badges */}
                    <div className="flex flex-col gap-2 items-end">
                        <span
                            className="text-[10px] font-bold px-3 py-1 rounded-full"
                            style={{
                                background: "rgba(201,168,76,0.12)",
                                color: "#C9A84C",
                                border: "1px solid rgba(201,168,76,0.2)",
                            }}
                        >
                            {selectedSize}
                        </span>
                        <span
                            className="text-[10px] font-bold px-3 py-1 rounded-full"
                            style={{
                                background: "rgba(201,168,76,0.12)",
                                color: "#C9A84C",
                                border: "1px solid rgba(201,168,76,0.2)",
                            }}
                        >
                            ×{selectedQty} قطعة
                        </span>
                    </div>
                </div>

                {/* ── CTA Button ── */}
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                        document
                            .getElementById("order-form")
                            ?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                    className="w-full font-bold cursor-pointer transition-all duration-300"
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

                {/* Min quantity note */}
                <p className="text-center text-[11px] text-[#aaa]">
                    ✓ أقل كمية {product.quantities[0]} قطعة
                </p>
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Products Section
   ───────────────────────────────────────────── */

export default function ProductCards() {
    return (
        <section id="products" className="py-24 px-4" style={{ background: "#F9F9F7" }}>
            <div className="max-w-[1200px] mx-auto">
                {/* ── Section Header ── */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" as const }}
                        className="text-3xl md:text-4xl font-black text-[#1C1C1C] mb-3"
                    >
                        أسعار منتجاتنا
                    </motion.h2>

                    {/* Gold underline accent */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" as const }}
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
                        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" as const }}
                        className="text-[#888] text-base md:text-lg"
                    >
                        اختر المقاس والكمية لمعرفة السعر فوراً
                    </motion.p>
                </div>

                {/* ── Products Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            index={index}
                            isLast={index === products.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
