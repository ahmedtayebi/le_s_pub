"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useOrder } from '@/context/OrderContext'

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

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */

interface FormData {
    fullName: string;
    phone: string;
    wilaya: string;
    bagType: string;
    size: string;
    quantity: number;
    hasDesign: string;
    notes: string;
}

/* ─────────────────────────────────────────────
   Shared Input Styles
   ───────────────────────────────────────────── */

const baseInputStyle: React.CSSProperties = {
    width: "100%",
    border: "1.5px solid #E0E0E0",
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
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onClose();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [onClose]);

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
                        border: "none",
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
                border: "3px solid rgba(0,0,0,0.15)",
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
        setValue,
        formState: { errors },
    } = useForm<FormData>({ mode: "onTouched" });

    const { orderSelection } = useOrder();
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        if (orderSelection.product) {
            setIsDismissed(false);
            const productMap: Record<string, string> = {
                'SAC SHOPPING': 'sac-shopping',
                'SAC 5KG': 'sac-5kg',
                'SAC 5Kg': 'sac-5kg',
                'SAC PAPIER RIGIDE': 'sac-rigide',
                'SAC PAPIER CRAFT': 'sac-craft',
                'SAC DE LIVRAISON': 'sac-livraison'
            }
            const productKey = Object.keys(productMap).find(k =>
                orderSelection.product.toUpperCase().includes(k.toUpperCase())
            )
            if (productKey) setValue('bagType', productMap[productKey]);
            if (orderSelection.size) setValue('size', orderSelection.size);
            if (orderSelection.quantity) setValue('quantity', Number(orderSelection.quantity));
        }
    }, [orderSelection, setValue]);

    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const onSubmit = (data: FormData) => {
        setIsLoading(true);
        // Simulate async submission
        setTimeout(() => {
            setIsLoading(false);
            setShowSuccess(true);
            console.log("Order submitted:", { ...data, file: selectedFile?.name });
        }, 1500);
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
        reset();
        setSelectedFile(null);
        setPreview(null);
    };

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

                    {/* ── Auto-fill Banner ── */}
                    <AnimatePresence>
                        {orderSelection.product && !isDismissed && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: -10, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div
                                    className="flex items-center justify-between gap-4 mb-6"
                                    style={{
                                        background: "rgba(201,168,76,0.08)",
                                        border: "1px solid rgba(201,168,76,0.3)",
                                        borderRadius: "12px",
                                        padding: "12px 16px",
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="text-[#C9A84C]">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p style={{ color: "#C9A84C", fontWeight: 700, fontSize: "0.9rem" }}>
                                                تم تحديد طلبك تلقائياً:
                                            </p>
                                            <p style={{ color: "#888", fontSize: "0.82rem" }}>
                                                {orderSelection.product} — مقاس {orderSelection.size} — كمية {orderSelection.quantity}+
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsDismissed(true)}
                                        className="text-[#C9A84C] hover:text-[#A8832A] transition-colors cursor-pointer"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

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

                        {/* Row 3: Bag Type + Size + Quantity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Bag Type */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-bold text-[#444]">
                                        نوع الكيس <span className="text-[#E53E3E]">*</span>
                                    </label>
                                    {orderSelection.product && (
                                        <motion.span
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-[0.72rem] font-bold text-[#C9A84C]"
                                        >
                                            ✓ تم التحديد تلقائياً
                                        </motion.span>
                                    )}
                                </div>
                                <select
                                    {...register("bagType", { required: "يرجى اختيار نوع الكيس" })}
                                    style={{
                                        ...(errors.bagType ? errorInputStyle : baseInputStyle),
                                        borderColor: orderSelection.product ? "#C9A84C" : (errors.bagType ? "#E53E3E" : "#E0E0E0"),
                                        backgroundColor: orderSelection.product ? "rgba(201,168,76,0.04)" : (errors.bagType ? "rgba(229,62,62,0.03)" : "#fff"),
                                        appearance: "none" as const,
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "left 16px center",
                                    }}
                                    defaultValue=""
                                    {...inputFocusHandlers(!!errors.bagType)}
                                >
                                    <option value="" disabled>
                                        -- اختر نوع الكيس --
                                    </option>
                                    <option value="sac-shopping">🛍 Sac Shopping — كيس التسوق</option>
                                    <option value="sac-5kg">💪 Sac 5Kg — كيس 5 كغ</option>
                                    <option value="sac-rigide">🎁 Sac Papier Rigide — كيس ريقيد</option>
                                    <option value="sac-craft">📦 Sac Papier Craft — كيس كرافت</option>
                                    <option value="sac-livraison">🚚 Sac de Livraison — كيس التوصيل</option>
                                </select>
                                {errors.bagType && (
                                    <p className="text-[#E53E3E] text-xs mt-1 font-semibold">
                                        {errors.bagType.message}
                                    </p>
                                )}
                            </div>

                            {/* Quantity */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-bold text-[#444]">
                                        الكمية المطلوبة <span className="text-[#E53E3E]">*</span>
                                    </label>
                                    {orderSelection.product && (
                                        <motion.span
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-[0.72rem] font-bold text-[#C9A84C]"
                                        >
                                            ✓ تم التحديد تلقائياً
                                        </motion.span>
                                    )}
                                </div>
                                <input
                                    {...register("quantity", {
                                        required: "هذا الحقل مطلوب",
                                        min: { value: 200, message: "الحد الأدنى 200 قطعة" },
                                        valueAsNumber: true,
                                    })}
                                    type="number"
                                    min={200}
                                    placeholder="200 كحد أدنى"
                                    style={{
                                        ...(errors.quantity ? errorInputStyle : baseInputStyle),
                                        borderColor: orderSelection.product ? "#C9A84C" : (errors.quantity ? "#E53E3E" : "#E0E0E0"),
                                        backgroundColor: orderSelection.product ? "rgba(201,168,76,0.04)" : (errors.quantity ? "rgba(229,62,62,0.03)" : "#fff"),
                                    }}
                                    {...inputFocusHandlers(!!errors.quantity)}
                                />
                                {errors.quantity && (
                                    <p className="text-[#E53E3E] text-xs mt-1 font-semibold">
                                        {errors.quantity.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Size field */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-[#444]">
                                    المقاس المطلوب <span className="text-[#E53E3E]">*</span>
                                </label>
                                {orderSelection.product && (
                                    <motion.span
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-[0.72rem] font-bold text-[#C9A84C]"
                                    >
                                        ✓ تم التحديد تلقائياً
                                    </motion.span>
                                )}
                            </div>
                            <input
                                {...register("size", { required: "يرجى تحديد المقاس المطلوب" })}
                                type="text"
                                placeholder="مثال: 40/30 Cm"
                                style={{
                                    ...(errors.size ? errorInputStyle : baseInputStyle),
                                    borderColor: orderSelection.product ? "#C9A84C" : (errors.size ? "#E53E3E" : "#E0E0E0"),
                                    backgroundColor: orderSelection.product ? "rgba(201,168,76,0.04)" : (errors.size ? "rgba(229,62,62,0.03)" : "#fff"),
                                }}
                                {...inputFocusHandlers(!!errors.size)}
                            />
                            {errors.size && (
                                <p className="text-[#E53E3E] text-xs mt-1 font-semibold">
                                    {errors.size.message}
                                </p>
                            )}
                            <p className="text-xs mt-1.5 font-semibold" style={{ color: "#C9A84C" }}>
                                راجع جدول الأسعار أعلاه لاختيار المقاس المناسب
                            </p>
                        </div>

                        {/* Row 4: Has Design — Toggle Cards */}
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
                                            border: "1.5px solid #E0E0E0",
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
                                            style={{ border: "1.5px solid transparent" }}
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

                        {/* Row 5: Notes (optional) */}
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

                        {/* Row 6: File Upload (optional) */}
                        <div>
                            <label className="block text-sm font-bold text-[#444] mb-2">
                                رفع صورة التصميم (اختياري)
                            </label>

                            {/* Hidden file input */}
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            {!selectedFile ? (
                                <button
                                    type="button"
                                    onClick={() => fileRef.current?.click()}
                                    className="w-full cursor-pointer flex items-center justify-center gap-2 transition-all duration-200"
                                    style={{
                                        border: "2px dashed #D0D0D0",
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
                                        border: "1.5px solid #C9A84C",
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
                                                border: "1px solid #E0E0E0",
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
                                            border: "none",
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
                            disabled={isLoading}
                            whileHover={isLoading ? {} : { scale: 1.02 }}
                            whileTap={isLoading ? {} : { scale: 0.97 }}
                            className="w-full font-extrabold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2"
                            style={{
                                background: "linear-gradient(135deg, #C9A84C, #F0C040)",
                                color: "#000",
                                padding: "18px",
                                borderRadius: "14px",
                                border: "none",
                                fontSize: "1.1rem",
                                opacity: isLoading ? 0.8 : 1,
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
                            {isLoading ? <Spinner /> : "إرسال الطلب ✦"}
                        </motion.button>

                        {/* WhatsApp alternative */}
                        {/* <div className="text-center">
                            <p className="text-sm text-[#999] mb-2">أو تواصل معنا مباشرة</p>
                            <a
                                href="https://wa.me/213777640477"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200"
                                style={{
                                    color: "#25D366",
                                    padding: "10px 20px",
                                    borderRadius: "10px",
                                    border: "1.5px solid #25D366",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLAnchorElement).style.background = "#25D366";
                                    (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                                    (e.currentTarget as HTMLAnchorElement).style.color = "#25D366";
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
                                    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.129 6.744 3.047 9.379L1.054 31.25l6.093-1.955a15.93 15.93 0 008.857 2.68C24.826 31.975 32 24.799 32 16.004 32 7.176 24.826 0 16.004 0zm9.338 22.617c-.393 1.107-1.941 2.025-3.174 2.293-.846.18-1.951.324-5.672-1.219-4.762-1.975-7.826-6.813-8.063-7.127-.229-.314-1.916-2.551-1.916-4.865 0-2.314 1.213-3.451 1.643-3.924.393-.43 1.022-.615 1.617-.615.195 0 .371.01.527.018.43.018.645.043.928.717.352.84 1.213 2.955 1.32 3.172.107.217.213.502.072.803-.131.305-.262.494-.48.766-.217.271-.42.479-.637.77-.197.26-.42.537-.174.957.246.412 1.096 1.807 2.354 2.928 1.615 1.439 2.975 1.885 3.398 2.094.424.209.67.174.916-.107.254-.281 1.08-1.256 1.369-1.689.281-.434.57-.357.957-.215.393.143 2.494 1.178 2.92 1.393.43.215.713.322.82.502.105.18.105 1.037-.289 2.145z" />
                                </svg>
                                Le S Publicité — واتساب
                            </a>
                        </div> */}
                    </form>
                </div>
            </section>
        </>
    );
}
