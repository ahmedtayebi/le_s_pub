"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Palette,
    Smartphone,
    Zap,
    Link2,
    FileUp,
    Headphones
} from 'lucide-react';

const featureData = [
    {
        title: "تصميم فريد",
        desc: "نصمم لك واجهة عصرية تعكس فخامة علامتك التجارية وتجذب العملاء من النظرة الأولى",
        icon: <Palette size={26} color="#C9A84C" />,
        gradient: "from-purple-500/10 to-transparent"
    },
    {
        title: "متجاوب مع الموبايل",
        desc: "صفحتك ستعمل ببراعة على جميع الأجهزة، الهاتف، التابلت، والكمبيوتر، بدون أي مشاكل",
        icon: <Smartphone size={26} color="#C9A84C" />,
        gradient: "from-[#C9A84C]/10 to-transparent"
    },
    {
        title: "سرعة تحميل عالية",
        desc: "استخدام تقنيات Next.js يضمن سرعة تحميل خارقة لتقليل احتمالية خروج الزبائن من الصفحة",
        icon: <Zap size={26} color="#C9A84C" />,
        gradient: "from-yellow-500/10 to-transparent"
    },
    {
        title: "ربط السوشيال ميديا",
        desc: "توجيه العملاء بسهولة من وإلى حساباتك في إنستغرام، فيسبوك، واتساب لبناء علاقة قوية",
        icon: <Link2 size={26} color="#C9A84C" />,
        gradient: "from-green-500/10 to-transparent"
    },
    {
        title: "نموذج طلب مدمج",
        desc: "نظام طلبات ذكي يسمح لعملاءك بإرسال بياناتهم وملفاتهم مباشرة لتصلك في جدول منظم",
        icon: <FileUp size={26} color="#C9A84C" />,
        gradient: "from-blue-500/10 to-transparent"
    },
    {
        title: "دعم فني مستمر",
        desc: "فريقنا معك دائماً لأي تحديث أو تعديل تطلبه، نضمن لك استمرارية عمل صفحتك بأفضل أداء",
        icon: <Headphones size={26} color="#C9A84C" />,
        gradient: "from-red-500/10 to-transparent"
    }
];

export default function Features() {
    return (
        <section
            id="features"
            className="bg-[#000000] font-cairo"
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
                        style={{ letterSpacing: "2px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
                        ماذا تحصل عليه؟
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white font-bold text-3xl md:text-4xl lg:text-5xl mb-6 text-center leading-tight"
                    >
                        كل ما يحتاجه براندك في صفحة واحدة
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="w-[80px] h-[3px] bg-[#C9A84C] mx-auto rounded-full"
                    />
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {featureData.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                opacity: 0,
                                y: 30,
                                borderColor: "rgba(255,255,255,0.06)",
                                boxShadow: "0px 0px 0px rgba(0,0,0,0)"
                            }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.4,
                                delay: i * 0.08
                            }}
                            whileHover={{
                                y: -6,
                                borderColor: "rgba(201,168,76,0.3)",
                                boxShadow: "0px 20px 40px rgba(0,0,0,0.3)",
                                transition: { duration: 0.2, delay: 0 }
                            }}
                            className="relative bg-[#0d0d0d] border-solid border-[1px] rounded-[20px] p-[28px_24px] overflow-hidden group"
                        >
                            {/* Gradient Blob */}
                            <div className={`absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-gradient-to-br ${feature.gradient} opacity-60 blur-[40px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100`} />

                            {/* Icon Wrapper */}
                            <div style={{
                                width: '56px', height: '56px',
                                background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))',
                                border: '1px solid rgba(201,168,76,0.25)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '20px'
                            }}>
                                {feature.icon}
                            </div>

                            {/* Typography */}
                            <div className="relative z-10">
                                <h3 className="text-white font-[700] text-[1rem]">{feature.title}</h3>
                                <p className="text-[#666666] text-[0.85rem] leading-[1.7] mt-[8px]">
                                    {feature.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
