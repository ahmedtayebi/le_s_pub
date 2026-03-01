"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    XCircle,
    CheckCircle2,
    TrendingDown,
    Users,
    Layout,
    Globe,
    PhoneCall,
    TrendingUp,
    ArrowLeft
} from 'lucide-react';

const problems = [
    {
        title: "ما عندكش موقع",
        desc: "الاعتماد الكامل على السوشيال ميديا يعني أن حسابك قد يُحذف أو يُقيَّد في أي وقت",
        icon: <TrendingDown size={18} color="#ef4444" />
    },
    {
        title: "عملاؤك ما يلقاوكش",
        desc: "رسائل DM و WhatsApp مشتتة ولا تُبنى عليها قاعدة بيانات قوية لنمو البزنس",
        icon: <Users size={18} color="#ef4444" />
    },
    {
        title: "السوشيال ميديا وحدها",
        desc: "الزبون لا يجد مكاناً موحداً ومحترفاً لمعرفة خدماتك وأسعارك وبناء الثقة",
        icon: <Layout size={18} color="#ef4444" />
    },
];

const solutions = [
    {
        title: "صفحة هبوط احترافية",
        desc: "موقعك هو عنوانك الدائم والآمن الذي لا يستطيع أحد حذفه أو تقييده",
        icon: <Globe size={18} color="#C9A84C" />
    },
    {
        title: "عميلك يلقاك ويطلب مباشرة",
        desc: "نموذج طلب ذكي يجمع كل البيانات (اسم، هاتف، لوغو) في Google Sheet منظم",
        icon: <PhoneCall size={18} color="#C9A84C" />
    },
    {
        title: "حضور رقمي يرفع مبيعاتك",
        desc: "تصميم عصري يبني الثقة ويحول الزائر المتردد إلى عميل وفيّ لعلامتك",
        icon: <TrendingUp size={18} color="#C9A84C" />
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
                        style={{ letterSpacing: "3px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
                        هل هذا وضعك الآن؟
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white font-bold text-3xl md:text-4xl lg:text-5xl mb-6 text-center flex items-center justify-center gap-3"
                    >
                        المشكلة <XCircle size={22} color="#ef4444" />
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
                                <div style={{
                                    width: '36px', height: '36px',
                                    background: 'rgba(239,68,68,0.1)',
                                    border: '1px solid rgba(239,68,68,0.2)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    {prob.icon}
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
                        <motion.div
                            animate={{ x: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="hidden lg:flex items-center justify-center drop-shadow-[0_0_20px_rgba(201,168,76,0.5)]"
                        >
                            <ArrowLeft size={48} color="#C9A84C" strokeWidth={1.5} />
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="flex lg:hidden items-center justify-center drop-shadow-[0_0_20px_rgba(201,168,76,0.5)]"
                        >
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 5v14M5 12l7 7 7-7" />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Right - Solutions */}
                    <div style={{ direction: "rtl" }} className="w-full lg:w-[45%] flex flex-col gap-3">
                        {/* Solution Header for Column */}
                        <div className="mb-4 text-center lg:text-right">
                            <h3 className="text-white font-bold text-2xl flex items-center justify-center lg:justify-start gap-2">
                                الحل مع Le S Publicité
                                <span style={{
                                    display: 'inline-block',
                                    width: '24px', height: '2px',
                                    background: 'linear-gradient(90deg, #C9A84C, #F0C040)',
                                    borderRadius: '2px',
                                    verticalAlign: 'middle',
                                    marginLeft: '8px'
                                }} />
                            </h3>
                        </div>

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
                                <div style={{
                                    width: '36px', height: '36px',
                                    background: 'rgba(201,168,76,0.1)',
                                    border: '1px solid rgba(201,168,76,0.2)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    {sol.icon}
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
