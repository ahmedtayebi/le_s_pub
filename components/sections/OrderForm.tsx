"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */

interface FormData {
    fullName: string;
    phone: string;
    shopType: string;
}

/* ─────────────────────────────────────────────
   Shared Input Styles
   ───────────────────────────────────────────── */

const baseInputStyle: React.CSSProperties = {
    width: "100%",
    borderWidth: "1.5px",
    borderStyle: "solid",
    borderColor: "#E0E0E0",
    borderRadius: "12px",
    padding: "14px 18px",
    fontFamily: "'Cairo', sans-serif",
    fontSize: "0.95rem",
    color: "#1C1C1C",
    backgroundColor: "#fff",
    backgroundImage: "none",
    outline: "none",
    transition: "all 0.2s ease",
};

const errorInputStyle: React.CSSProperties = {
    ...baseInputStyle,
    borderColor: "#E53E3E",
    backgroundColor: "rgba(229,62,62,0.03)",
};

function inputFocusHandlers(hasError: boolean) {
    return {
        onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
            if (!hasError) {
                e.currentTarget.style.borderColor = "#C9A84C";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.15)";
            }
        },
        onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
            e.currentTarget.style.borderColor = hasError ? "#E53E3E" : "#E0E0E0";
            e.currentTarget.style.boxShadow = "none";
        },
    };
}

/* ─────────────────────────────────────────────
   Success Modal
   ───────────────────────────────────────────── */

function SuccessModal({ onClose }: { onClose: () => void }) {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        const rafId = requestAnimationFrame(() => {
            timer = setTimeout(onClose, 5000);
        });
        return () => {
            cancelAnimationFrame(rafId);
            clearTimeout(timer);
        };
    }, [onClose]);

    useEffect(() => {
        const countdownTimer = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(countdownTimer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        >
            <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-md text-center"
                style={{
                    background: "#fff",
                    borderRadius: "24px",
                    padding: "48px 36px",
                    boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
                }}
            >
                {/* Animated checkmark */}
                <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center rounded-full"
                    style={{ background: "rgba(56,178,96,0.1)" }}
                >
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <motion.circle
                            cx="24" cy="24" r="20"
                            stroke="#38B260"
                            strokeWidth="3"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" as const }}
                        />
                        <motion.path
                            d="M14 24L21 31L34 17"
                            stroke="#38B260"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" as const }}
                        />
                    </svg>
                </div>

                <h3 className="text-2xl font-black text-[#1C1C1C] mb-2">
                    تم إرسال طلبك بنجاح! 🎉
                </h3>
                <p className="text-[#666] text-sm mb-6 leading-relaxed">
                    سنتصل بك في أقرب وقت ممكن.
                </p>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onClose}
                    className="cursor-pointer font-bold text-sm"
                    style={{
                        background: "#C9A84C",
                        color: "#000",
                        padding: "12px 32px",
                        borderRadius: "12px",
                        borderWidth: 0,
                    }}
                >
                    إغلاق ({countdown})
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Spinner
   ───────────────────────────────────────────── */

function Spinner() {
    return (
        <span
            className="inline-block w-5 h-5 rounded-full"
            style={{
                borderWidth: "3px",
                borderStyle: "solid",
                borderColor: "rgba(0,0,0,0.15)",
                borderTopColor: "#000",
                animation: "spin 0.6s linear infinite",
            }}
        />
    );
}

/* ─────────────────────────────────────────────
   Order Form Component
   ───────────────────────────────────────────── */

export default function OrderForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({ mode: "onTouched" });

    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const onSubmit = async (formData: FormData) => {
        const GOOGLE_SCRIPT_URL =
            "https://script.google.com/macros/s/AKfycbxblcu4gfGmiLVEYbBIJ3T7MWDLFUbki9t4DLW-G5GtlXh3a8YuhjshVd3x6JJrDC4PAg/exec";

        setIsLoading(true);
        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    phone: formData.phone,
                    shopType: formData.shopType,
                }),
            });

            setShowSuccess(true);
            reset();
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseSuccess = useCallback(() => {
        setShowSuccess(false);
        reset();
    }, [reset]);

    return (
        <>
            {/* Spinner keyframe */}
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccess && <SuccessModal onClose={handleCloseSuccess} />}
            </AnimatePresence>

            <section
                id="order-form"
                className="py-24 px-4"
                style={{ background: "#FAFAF7" }}
            >
                <div
                    className="mx-auto w-full"
                    style={{
                        maxWidth: "760px",
                        background: "#FFFFFF",
                        borderRadius: "30px",
                        boxShadow: "0 8px 60px rgba(0,0,0,0.1)",
                        padding: "clamp(24px, 4vw, 56px) clamp(24px, 4vw, 64px)",
                    }}
                >
                    {/* ── Header ── */}
                    <div className="text-center mb-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: "easeOut" as const }}
                            className="text-3xl md:text-4xl font-black text-[#1C1C1C] mb-3"
                        >
                            فريق كامل لاستقبالكم
                        </motion.h2>

                        {/* Gold underline */}
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
                            className="text-[#888] text-base"
                        >
                            خلينا رقمك نتصلو بيك نفهموك طريقة تعامل معانا
                        </motion.p>
                    </div>

                    {/* ── Form ── */}
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

                        {/* Row 1: Name + Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-bold text-[#444] mb-2">
                                    الاسم الكامل <span className="text-[#E53E3E]">*</span>
                                </label>
                                <input
                                    {...register("fullName", { required: "هذا الحقل مطلوب" })}
                                    type="text"
                                    placeholder="مثال: أحمد الطيبي"
                                    style={errors.fullName ? errorInputStyle : baseInputStyle}
                                    {...inputFocusHandlers(!!errors.fullName)}
                                />
                                {errors.fullName && (
                                    <p className="text-[#E53E3E] text-xs mt-1 font-semibold">
                                        {errors.fullName.message}
                                    </p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-bold text-[#444] mb-2">
                                    رقم الهاتف <span className="text-[#E53E3E]">*</span>
                                </label>
                                <input
                                    {...register("phone", {
                                        required: "هذا الحقل مطلوب",
                                        pattern: {
                                            value: /^0[567]\d{8}$/,
                                            message: "رقم هاتف غير صالح (يبدأ بـ 05/06/07 ويتكون من 10 أرقام)",
                                        },
                                    })}
                                    type="tel"
                                    placeholder="05XXXXXXXX"
                                    dir="ltr"
                                    style={{
                                        ...(errors.phone ? errorInputStyle : baseInputStyle),
                                        textAlign: "right" as const,
                                    }}
                                    {...inputFocusHandlers(!!errors.phone)}
                                />
                                {errors.phone && (
                                    <p className="text-[#E53E3E] text-xs mt-1 font-semibold">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Row 2: Shop Type */}
                        <div>
                            <label className="block text-sm font-bold text-[#444] mb-2">
                                نوع المحل <span className="text-[#E53E3E]">*</span>
                            </label>
                            <input
                                {...register("shopType", { required: "هذا الحقل مطلوب" })}
                                type="text"
                                placeholder="مثال: مخبزة، صيدلية، ملابس..."
                                style={errors.shopType ? errorInputStyle : baseInputStyle}
                                {...inputFocusHandlers(!!errors.shopType)}
                            />
                            {errors.shopType && (
                                <p className="text-[#E53E3E] text-xs mt-1 font-semibold">
                                    {errors.shopType.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={isLoading ? {} : { scale: 1.02 }}
                            whileTap={isLoading ? {} : { scale: 0.97 }}
                            className="w-full font-extrabold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2"
                            style={{
                                background: "linear-gradient(135deg, #C9A84C, #F0C040)",
                                color: "#000",
                                padding: "18px",
                                borderRadius: "14px",
                                borderWidth: 0,
                                fontSize: "1.1rem",
                                opacity: isLoading ? 0.4 : 1,
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                if (!isLoading) {
                                    (e.currentTarget as HTMLButtonElement).style.background =
                                        "linear-gradient(135deg, #A8832A, #C9A84C)";
                                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                                        "0 8px 30px rgba(201,168,76,0.4)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background =
                                    "linear-gradient(135deg, #C9A84C, #F0C040)";
                                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                            }}
                        >
                            {isLoading ? <Spinner /> : "اتصل بي الآن ✦"}
                        </motion.button>

                    </form>
                </div>
            </section>
        </>
    );
}
