"use client";

import React from "react";
import { motion } from "framer-motion";

const features = [
    {
        icon: "🎨",
        title: "تصميم عصري ومتجاوب",
        desc: "يعمل بشكل مثالي على الهاتف والكمبيوتر",
        gradient: "from-purple-500/10 to-transparent"
    },
    {
        icon: "📋",
        title: "نموذج طلب ذكي",
        desc: "يجمع البيانات والملفات مباشرة لـ Google Sheet",
        gradient: "from-[#C9A84C]/10 to-transparent"
    },
    {
        icon: "⚡",
        title: "سرعة تحميل ممتازة",
        desc: "Next.js يضمن أداءً خارقاً وتجربة مستخدم سلسة",
        gradient: "from-yellow-500/10 to-transparent"
    },
    {
        icon: "🔗",
        title: "ربط Google Sheet",
        desc: "كل طلب يصل فورياً لجدولك مع جميع التفاصيل",
        gradient: "from-green-500/10 to-transparent"
    },
    {
        icon: "🖼️",
        title: "رفع الملفات مدمج",
        desc: "الزبون يرفع لوغوه مباشرة — يُحفظ على Cloudinary",
        gradient: "from-blue-500/10 to-transparent"
    },
    {
        icon: "🛡️",
        title: "دعم مستمر بعد التسليم",
        desc: "أي تعديل أو مشكلة — نحن هنا دائماً",
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
                        style={{ letterSpacing: "2px" }}
                    >
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
                    {features.map((feature, i) => (
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
                            <div className="relative z-10 w-[52px] h-[52px] rounded-[14px] bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center text-[1.5rem] mb-[16px]">
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
