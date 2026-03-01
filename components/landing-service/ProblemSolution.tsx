"use client";

import React from "react";
import { motion } from "framer-motion";

const problems = [
    {
        title: "الاعتماد الكامل على السوشيال ميديا",
        desc: "حسابك قد يُحذف أو يُقيَّد في أي وقت",
    },
    {
        title: "طلبات غير منظمة ومشتتة",
        desc: "رسائل DM و WhatsApp لا تُبنى عليها قاعدة بيانات",
    },
    {
        title: "لا توجد صفحة احترافية للعرض",
        desc: "الزبون لا يجد مكاناً موحداً لمعرفة خدماتك وأسعارك",
    },
];

const solutions = [
    {
        title: "موقعك = عنوانك الدائم على الإنترنت",
        desc: "لا أحد يستطيع حذفه أو تقييده — هو ملكك",
    },
    {
        title: "نموذج طلب ذكي يجمع كل البيانات",
        desc: "اسم، هاتف، ولاية، لوغو — كل شيء في Google Sheet",
    },
    {
        title: "صفحة احترافية تعكس قيمة براندك",
        desc: "تصميم عصري يبني الثقة ويحول الزائر إلى عميل",
    },
];

export default function ProblemSolution() {
    return (
        <section
            id="problem-solution"
            className="bg-[#0a0a0a] font-cairo"
            style={{ padding: "100px 24px" }}
            dir="rtl"
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[#C9A84C] text-[13px] md:text-sm uppercase font-bold mb-4"
                        style={{ letterSpacing: "3px" }}
                    >
                        هل هذا وضعك الآن؟
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white font-bold text-3xl md:text-4xl lg:text-5xl mb-6 text-center"
                    >
                        المشكلة التي يعاني منها معظم البراندات
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="w-[80px] h-[3px] bg-[#C9A84C] mx-auto rounded-full"
                    />
                </div>

                {/* Two Columns Container */}
                <div
                    style={{ direction: "ltr" }}
                    className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10 w-full"
                >
                    {/* Left - Problems */}
                    <div style={{ direction: "rtl" }} className="w-full lg:w-[45%] flex flex-col gap-3">
                        {problems.map((prob, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-row items-start rounded-[16px] p-[20px_24px] border border-[rgba(255,60,60,0.15)] bg-[rgba(255,0,0,0.04)]"
                                style={{ gap: "14px" }}
                            >
                                <div className="flex-shrink-0 w-[40px] h-[40px] rounded-full bg-[rgba(255,60,60,0.1)] flex items-center justify-center text-sm">
                                    ❌
                                </div>
                                <div>
                                    <h3 className="text-white font-[700] text-[0.95rem]">{prob.title}</h3>
                                    <p className="text-[#666666] text-[0.85rem] mt-[4px] leading-relaxed">{prob.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Center - Arrow */}
                    <div className="flex-shrink-0 flex items-center justify-center">
                        {/* Desktop Arrow Right */}
                        <motion.div
                            animate={{ x: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="hidden lg:flex items-center justify-center drop-shadow-[0_0_20px_rgba(201,168,76,0.5)]"
                        >
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#goldGradientArrow1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <defs>
                                    <linearGradient id="goldGradientArrow1" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#C9A84C" />
                                        <stop offset="100%" stopColor="#FFF1B8" />
                                    </linearGradient>
                                </defs>
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </motion.div>

                        {/* Mobile Arrow Down */}
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="flex lg:hidden items-center justify-center drop-shadow-[0_0_20px_rgba(201,168,76,0.5)]"
                        >
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#goldGradientArrow2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <defs>
                                    <linearGradient id="goldGradientArrow2" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#C9A84C" />
                                        <stop offset="100%" stopColor="#FFF1B8" />
                                    </linearGradient>
                                </defs>
                                <path d="M12 5v14M5 12l7 7 7-7" />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Right - Solutions */}
                    <div style={{ direction: "rtl" }} className="w-full lg:w-[45%] flex flex-col gap-3">
                        {solutions.map((sol, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + (i * 0.1) }}
                                className="group flex flex-row items-start rounded-[16px] p-[20px_24px] border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.04)] hover:border-[rgba(201,168,76,0.5)] hover:bg-[rgba(201,168,76,0.07)] transition-all duration-300"
                                style={{ gap: "14px" }}
                            >
                                <div className="flex-shrink-0 w-[40px] h-[40px] rounded-full bg-[rgba(201,168,76,0.1)] flex items-center justify-center text-sm transition-transform duration-300 group-hover:scale-110">
                                    ✅
                                </div>
                                <div>
                                    <h3 className="text-[#C9A84C] font-[700] text-[0.95rem]">{sol.title}</h3>
                                    <p className="text-[#666666] text-[0.85rem] mt-[4px] leading-relaxed group-hover:text-[#999] transition-colors duration-300">{sol.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
