"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from '@/context/CartContext'

/* ─────────────────────────────────────────────
   Algerian Wilayas (58)
   ───────────────────────────────────────────── */

const wilayas = [
    "01-أدرار", "02-الشلف", "03-الأغواط", "04-أم البواقي", "05-باتنة",
    "06-بجاية", "07-بسكرة", "08-بشار", "09-البليدة", "10-البويرة",
    "11-تمنراست", "12-تبسة", "13-تلمسان", "14-تيارت", "15-تيزي وزو",
    "16-الجزائر", "17-الجلفة", "18-جيجل", "19-سطيف", "20-سعيدة",
    "21-سكيكدة", "22-سيدي بلعباس", "23-عنابة", "24-قالمة", "25-قسنطينة",
    "26-المدية", "27-مستغانم", "28-المسيلة", "29-معسكر", "30-ورقلة",
    "31-وهران", "32-البيض", "33-إليزي", "34-برج بوعريريج", "35-بومرداس",
    "36-الطارف", "37-تندوف", "38-تيسمسيلت", "39-الوادي", "40-خنشلة",
    "41-سوق أهراس", "42-تيبازة", "43-ميلة", "44-عين الدفلى", "45-النعامة",
    "46-عين تموشنت", "47-غرداية", "48-غليزان", "49-تيميمون", "50-برج باجي مختار",
    "51-أولاد جلال", "52-بني عباس", "53-عين صالح", "54-عين قزام",
    "55-توقرت", "56-جانت", "57-المغير", "58-المنيعة",
];

const CLOUDINARY_CLOUD_NAME = "dwdgchpwh";
const CLOUDINARY_UPLOAD_PRESET = "les_publicite";

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */

interface FormData {
    fullName: string;
    phone: string;
    wilaya: string;
    hasDesign: string;
    notes: string;
    designImage?: FileList | File[];
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
        onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            if (!hasError) {
                e.currentTarget.style.borderColor = "#C9A84C";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.15)";
            }
        },
        onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

        const startTimer = () => {
            timer = setTimeout(() => {
                onClose();
            }, 5000);
        };

        const rafId = requestAnimationFrame(startTimer);

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
                    سنتواصل معك خلال 24 ساعة لتقديم عرض السعر المناسب.
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
   Cart Summary Banner
   ───────────────────────────────────────────── */

function CartBanner() {
    const { items, totalAmount } = useCart()

    if (items.length === 0) {
        return (
            <div style={{
                background: "rgba(239,68,68,0.06)",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "rgba(239,68,68,0.15)",
                borderRadius: "12px",
                padding: "14px 18px",
                marginBottom: "28px",
                color: "#ef4444",
                fontWeight: 600,
                fontSize: "0.9rem",
            }}>
                ⚠️ سلتك فارغة — أضف منتجات أولاً
            </div>
        )
    }

    return (
        <div style={{
            background: "rgba(201,168,76,0.06)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "rgba(201,168,76,0.15)",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "28px",
        }}>
            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ color: "#C9A84C", fontWeight: 700, fontSize: "1rem" }}>منتجاتك المختارة</span>
                <span style={{ color: "#888", fontSize: "0.85rem" }}>{items.length} منتج</span>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 12 }} />

            {/* Items list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map(item => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                        {/* Right: name + pills */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                            <span style={{ color: "#988e1eff", fontWeight: 600, fontSize: "0.9rem" }}>{item.productName}</span>
                            <div style={{ display: "flex", gap: 6 }}>
                                <span style={{
                                    background: "rgba(255,255,255,0.06)",
                                    borderRadius: 20,
                                    padding: "2px 10px",
                                    color: "#888",
                                    fontSize: "0.8rem",
                                }}>{item.size}</span>
                                <span style={{
                                    background: "rgba(255,255,255,0.06)",
                                    borderRadius: 20,
                                    padding: "2px 10px",
                                    color: "#888",
                                    fontSize: "0.8rem",
                                }}>×{item.quantity} قطعة</span>
                            </div>
                        </div>
                        {/* Left: price */}
                        <span style={{ color: "#C9A84C", fontWeight: 700, fontSize: "0.9rem" }}>
                            {item.totalPrice.toLocaleString()} دج
                        </span>
                    </div>
                ))}
            </div>

            {/* Bottom divider + total */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "14px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#888", fontSize: "0.9rem" }}>المجموع التقديري:</span>
                <span style={{ color: "#C9A84C", fontWeight: 700, fontSize: "1.1rem" }}>
                    {totalAmount.toLocaleString()} دج
                </span>
            </div>
        </div>
    )
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

    const { items, totalAmount, clearCart } = useCart();

    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const designImageField = register("designImage");

    const uploadToCloudinary = async (file: File): Promise<string> => {
        try {
            console.log("=== Cloudinary Debug ===");
            console.log("Cloud Name:", CLOUDINARY_CLOUD_NAME);
            console.log("Preset:", CLOUDINARY_UPLOAD_PRESET);
            console.log("File name:", file.name);
            console.log("File size:", file.size);
            console.log("File type:", file.type);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

            const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
            console.log("Uploading to:", url);

            const res = await fetch(url, {
                method: "POST",
                body: formData,
            });

            console.log("Response status:", res.status);
            console.log("Response ok:", res.ok);

            const data = await res.json();
            console.log("Full response:", JSON.stringify(data, null, 2));

            if (data.error) {
                console.error("Cloudinary error message:", data.error.message);
                return "";
            }

            if (data.secure_url) {
                console.log("✅ Success URL:", data.secure_url);
                return data.secure_url;
            }

            return "";
        } catch (err) {
            console.error("Upload exception:", err);
            return "";
        }
    };

    const onSubmit = async (formData: FormData) => {
        const GOOGLE_SCRIPT_URL =
            "https://script.google.com/macros/s/AKfycbwUMC9UB-4Ya8fzRqMHkzdnLesRf878LtIXrqZm2nBgr1zeovqJn0VGIsJAeUWWOCT8/exec";

        setIsLoading(true);
        try {
            let designImageUrl = "";
            const fileInput = formData.designImage;
            const file = fileInput instanceof FileList
                ? fileInput[0]
                : fileInput?.[0] ?? null;
            const finalFile = file instanceof File ? file : selectedFile;

            if (finalFile instanceof File) {
                designImageUrl = await uploadToCloudinary(finalFile);
                console.log("Image URL to send:", designImageUrl);
            }

            const cartSummary = items.map(item =>
                `${item.productName} | ${item.size} | كمية ${item.quantity}`
            ).join('\n')

            const cartJSON = JSON.stringify(items.map(item => ({
                p: item.productName,
                s: item.size,
                q: item.quantity,
                price: item.totalPrice
            })))

            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    phone: formData.phone,
                    wilaya: formData.wilaya,
                    hasDesign: formData.hasDesign,
                    notes: formData.notes,
                    designImageUrl: designImageUrl,
                    cartSummary: cartSummary,
                    cartJSON: cartJSON,
                    totalAmount: totalAmount.toString(),
                }),
            });

            setShowSuccess(true);
            reset();
            clearCart();
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseSuccess = useCallback(() => {
        setShowSuccess(false);
        reset();
        setSelectedFile(null);
        setPreview(null);
    }, [reset]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            alert("حجم الملف يجب أن لا يتجاوز 5 ميغابايت");
            return;
        }
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (ev) => setPreview(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const clearFile = () => {
        setSelectedFile(null);
        setPreview(null);
        if (fileRef.current) fileRef.current.value = "";
    };

    const cartEmpty = items.length === 0;

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
                        maxWidth: "860px",
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
                            أرسل طلبك الآن
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
                            سنتواصل معك في أقرب وقت لتقديم العرض المناسب
                        </motion.p>
                    </div>

                    {/* ── Cart Summary Banner ── */}
                    <CartBanner />

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
                                    placeholder="مثال:أحمد الطيبي"
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

                        {/* Row 2: Wilaya */}
                        <div>
                            <label className="block text-sm font-bold text-[#444] mb-2">
                                الولاية <span className="text-[#E53E3E]">*</span>
                            </label>
                            <select
                                {...register("wilaya", { required: "يرجى اختيار الولاية" })}
                                style={{
                                    ...(errors.wilaya ? errorInputStyle : baseInputStyle),
                                    appearance: "none" as const,
                                    backgroundColor: errors.wilaya ? "rgba(229,62,62,0.03)" : "#fff",
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "left 16px center",
                                }}
                                defaultValue=""
                                {...inputFocusHandlers(!!errors.wilaya)}
                            >
                                <option value="" disabled>
                                    -- اختر الولاية --
                                </option>
                                {wilayas.map((w) => (
                                    <option key={w} value={w}>
                                        {w}
                                    </option>
                                ))}
                            </select>
                            {errors.wilaya && (
                                <p className="text-[#E53E3E] text-xs mt-1 font-semibold">
                                    {errors.wilaya.message}
                                </p>
                            )}
                        </div>

                        {/* Row 3: Has Design — Toggle Cards */}
                        <div>
                            <label className="block text-sm font-bold text-[#444] mb-3">
                                هل لديك تصميم جاهز؟ <span className="text-[#E53E3E]">*</span>
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { value: "yes", label: "✅ نعم، لدي تصميم جاهز" },
                                    { value: "no", label: "🎨 لا، أحتاج مساعدة في التصميم" },
                                ].map((opt) => (
                                    <label
                                        key={opt.value}
                                        className="relative flex items-center gap-3 cursor-pointer rounded-xl transition-all duration-200"
                                        style={{
                                            padding: "14px 18px",
                                            borderWidth: "1.5px",
                                            borderStyle: "solid",
                                            borderColor: "#E0E0E0",
                                            background: "#fff",
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            value={opt.value}
                                            {...register("hasDesign", { required: "يرجى اختيار أحد الخيارين" })}
                                            className="peer sr-only"
                                        />
                                        <span className="text-sm text-[#444] peer-checked:text-[#1C1C1C] peer-checked:font-bold">
                                            {opt.label}
                                        </span>
                                        {/* Gold border overlay on check */}
                                        <span
                                            className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-200 peer-checked:border-[#C9A84C] peer-checked:bg-[rgba(201,168,76,0.04)]"
                                            style={{ borderWidth: "1.5px", borderStyle: "solid", borderColor: "transparent" }}
                                        />
                                        {/* Override parent border when checked */}
                                        <style>{`
                      label:has(input:checked) {
                        border-color: #C9A84C !important;
                        background: rgba(201,168,76,0.04) !important;
                      }
                    `}</style>
                                    </label>
                                ))}
                            </div>
                            {errors.hasDesign && (
                                <p className="text-[#E53E3E] text-xs mt-1 font-semibold">
                                    {errors.hasDesign.message}
                                </p>
                            )}
                        </div>

                        {/* Row 4: Notes (optional) */}
                        <div>
                            <label className="block text-sm font-bold text-[#444] mb-2">
                                ملاحظات إضافية
                            </label>
                            <textarea
                                {...register("notes")}
                                rows={4}
                                placeholder="أضف أي تفاصيل إضافية حول طلبك..."
                                style={{
                                    ...baseInputStyle,
                                    resize: "none" as const,
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "#C9A84C";
                                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.15)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = "#E0E0E0";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            />
                        </div>

                        {/* Row 5: File Upload (optional) */}
                        <div>
                            <label className="block text-sm font-bold text-[#444] mb-2">
                                رفع صورة التصميم (اختياري)
                            </label>

                            {/* Hidden file input */}
                            <input
                                name={designImageField.name}
                                ref={(el) => {
                                    designImageField.ref(el);
                                    fileRef.current = el;
                                }}
                                type="file"
                                accept="image/*"
                                onBlur={designImageField.onBlur}
                                onChange={(e) => {
                                    designImageField.onChange(e);
                                    handleFileChange(e);
                                }}
                                className="hidden"
                            />

                            {!selectedFile ? (
                                <button
                                    type="button"
                                    onClick={() => fileRef.current?.click()}
                                    className="w-full cursor-pointer flex items-center justify-center gap-2 transition-all duration-200"
                                    style={{
                                        borderWidth: "2px",
                                        borderStyle: "dashed",
                                        borderColor: "#D0D0D0",
                                        borderRadius: "12px",
                                        padding: "24px 18px",
                                        background: "#FAFAF7",
                                        color: "#888",
                                        fontSize: "0.9rem",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#C9A84C";
                                        (e.currentTarget as HTMLButtonElement).style.color = "#C9A84C";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#D0D0D0";
                                        (e.currentTarget as HTMLButtonElement).style.color = "#888";
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                    اضغط لرفع صورة التصميم (حد أقصى 5MB)
                                </button>
                            ) : (
                                <div
                                    className="flex items-center gap-4 relative"
                                    style={{
                                        borderWidth: "1.5px",
                                        borderStyle: "solid",
                                        borderColor: "#C9A84C",
                                        borderRadius: "12px",
                                        padding: "12px 16px",
                                        background: "rgba(201,168,76,0.04)",
                                    }}
                                >
                                    {/* Thumbnail preview */}
                                    {preview && (
                                        <div
                                            className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden"
                                            style={{
                                                borderWidth: "1px",
                                                borderStyle: "solid",
                                                borderColor: "#E0E0E0",
                                                backgroundImage: `url(${preview})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-[#1C1C1C] truncate">
                                            {selectedFile.name}
                                        </p>
                                        <p className="text-xs text-[#888]">
                                            {(selectedFile.size / 1024).toFixed(0)} KB
                                        </p>
                                    </div>
                                    {/* Clear button */}
                                    <button
                                        type="button"
                                        onClick={clearFile}
                                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
                                        style={{
                                            background: "rgba(229,62,62,0.08)",
                                            color: "#E53E3E",
                                            borderWidth: 0,
                                            fontSize: "1.1rem",
                                            fontWeight: 700,
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLButtonElement).style.background = "rgba(229,62,62,0.15)";
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLButtonElement).style.background = "rgba(229,62,62,0.08)";
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading || cartEmpty}
                            whileHover={isLoading || cartEmpty ? {} : { scale: 1.02 }}
                            whileTap={isLoading || cartEmpty ? {} : { scale: 0.97 }}
                            className="w-full font-extrabold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2"
                            style={{
                                background: "linear-gradient(135deg, #C9A84C, #F0C040)",
                                color: "#000",
                                padding: "18px",
                                borderRadius: "14px",
                                borderWidth: 0,
                                fontSize: "1.1rem",
                                opacity: isLoading || cartEmpty ? 0.4 : 1,
                                cursor: cartEmpty ? "not-allowed" : "pointer",
                            }}
                            onMouseEnter={(e) => {
                                if (!isLoading && !cartEmpty) {
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
                            {isLoading ? <Spinner /> : "إرسال الطلب ✦"}
                        </motion.button>

                    </form>
                </div>
            </section>
        </>
    );
}
