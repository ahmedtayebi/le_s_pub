"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    PenTool,
    Upload,
    Send,
    Instagram,
    Facebook,
    X,
    Check
} from "lucide-react";

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */

const CLOUDINARY_CLOUD_NAME = "dwdgchpwh";
const CLOUDINARY_UPLOAD_PRESET = "les_publicite";
const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxT_husU5wNUe5hfLOQyv-q3CTx3cL0Co7EX5SbWzJTjC3Mi5JpMAX7CBCeokOXo_7vkA/exec";

/* ─────────────────────────────────────────────
   Zod Schema
   ───────────────────────────────────────────── */

const schema = z.object({
    fullName: z.string().min(1, "هذا الحقل مطلوب"),
    phone: z
        .string()
        .regex(/^0[567]\d{8}$/, "رقم هاتف غير صالح (يبدأ بـ 05/06/07 — 10 أرقام)"),
    email: z.string().email("بريد إلكتروني غير صالح").or(z.literal("")).optional(),
    brandName: z.string().min(1, "هذا الحقل مطلوب"),
    description: z.string().min(1, "يرجى وصف نشاطك"),
    instagramUrl: z.string().url("رابط غير صالح").or(z.literal("")).optional(),
    facebookUrl: z.string().url("رابط غير صالح").or(z.literal("")).optional(),
    hasLogo: z.enum(["yes", "no"], { message: "يرجى اختيار أحد الخيارين" }),
    notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

/* ─────────────────────────────────────────────
   Styles
   ───────────────────────────────────────────── */

const baseInput: React.CSSProperties = {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.03)",
    border: "1.5px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
    padding: "14px 18px",
    color: "#fff",
    fontFamily: "'Cairo', sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    transition: "all 0.2s ease",
};

const errorInput: React.CSSProperties = {
    ...baseInput,
    borderColor: "#ef4444",
    backgroundColor: "rgba(239,68,68,0.04)",
};

function focusHandlers(hasError: boolean) {
    return {
        onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            if (!hasError) {
                e.currentTarget.style.borderColor = "#C9A84C";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.12)";
            }
        },
        onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            e.currentTarget.style.borderColor = hasError ? "#ef4444" : "rgba(255,255,255,0.08)";
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
        const t = setInterval(() => {
            setCountdown((p) => {
                if (p <= 1) { clearInterval(t); onClose(); return 0; }
                return p - 1;
            });
        }, 1000);
        return () => clearInterval(t);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
        >
            <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-md text-center"
                style={{
                    background: "#111",
                    borderRadius: "24px",
                    padding: "48px 36px",
                    border: "1px solid rgba(201,168,76,0.2)",
                    boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
                }}
            >
                <div
                    className="mx-auto mb-6 w-20 h-20 flex items-center justify-center rounded-full"
                    style={{ background: "rgba(201,168,76,0.1)" }}
                >
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <motion.circle
                            cx="24" cy="24" r="20" stroke="#C9A84C" strokeWidth="3" fill="none"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                        <motion.path
                            d="M14 24L21 31L34 17" stroke="#C9A84C" strokeWidth="3.5"
                            strokeLinecap="round" strokeLinejoin="round" fill="none"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
                        />
                    </svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">تم إرسال طلبك بنجاح!</h3>
                <p className="text-[#888] text-sm mb-6 leading-relaxed">
                    سنتواصل معك خلال 24 ساعة بعرض مخصص لبراندك.
                </p>
                <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={onClose}
                    className="cursor-pointer font-bold text-sm"
                    style={{
                        background: "linear-gradient(135deg, #C9A84C, #F0C040)",
                        color: "#000", padding: "12px 32px", borderRadius: "12px", border: "none",
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
                animation: "sof-spin 0.6s linear infinite",
            }}
        />
    );
}

/* ─────────────────────────────────────────────
   Error Label
   ───────────────────────────────────────────── */

function FieldError({ msg }: { msg?: string }) {
    if (!msg) return null;
    return <p className="text-xs mt-1 font-semibold" style={{ color: "#ef4444" }}>{msg}</p>;
}

/* ─────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────── */

export default function ServiceOrderForm() {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onTouched",
    });

    const hasLogo = watch("hasLogo");

    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    /* ── Cloudinary upload ── */
    const uploadToCloudinary = async (file: File): Promise<string> => {
        try {
            const fd = new FormData();
            fd.append("file", file);
            fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                { method: "POST", body: fd }
            );
            const data = await res.json();
            return data.secure_url || "";
        } catch {
            return "";
        }
    };

    /* ── Form submit ── */
    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            let logoUrl = "";
            if (data.hasLogo === "yes" && selectedFile) {
                logoUrl = await uploadToCloudinary(selectedFile);
            }

            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    date: new Date().toLocaleString("ar-DZ"),
                    fullName: data.fullName,
                    phone: data.phone,
                    email: data.email || "",
                    brandName: data.brandName,
                    description: data.description,
                    instagramUrl: data.instagramUrl || "",
                    facebookUrl: data.facebookUrl || "",
                    hasLogo: data.hasLogo === "yes" ? "نعم" : "لا",
                    logoUrl,
                    notes: data.notes || "",
                    formType: "landing-service",
                }),
            });

            setShowSuccess(true);
        } catch (err) {
            console.error("Submit error:", err);
        } finally {
            setIsLoading(false);
        }
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
        if (file.size > 5 * 1024 * 1024) { alert("حجم الملف يجب أن لا يتجاوز 5 ميغابايت"); return; }
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

    /* ── Render ── */
    return (
        <>
            <style>{`@keyframes sof-spin { to { transform: rotate(360deg); } }`}</style>

            <AnimatePresence>
                {showSuccess && <SuccessModal onClose={handleCloseSuccess} />}
            </AnimatePresence>

            <section
                id="service-form"
                dir="rtl"
                style={{
                    backgroundColor: "#0a0a0a",
                    padding: "96px 24px",
                    fontFamily: "'Cairo', sans-serif",
                }}
            >
                <div style={{ maxWidth: "760px", margin: "0 auto" }}>
                    {/* ── Header ── */}
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.4 }}
                            style={{
                                color: "#C9A84C",
                                fontWeight: 700,
                                fontSize: "0.85rem",
                                marginBottom: "12px",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px"
                            }}
                        >
                            <span style={{
                                display: 'inline-block',
                                width: '20px',
                                height: '2px',
                                background: '#C9A84C',
                                borderRadius: '2px',
                                verticalAlign: 'middle'
                            }} />
                            ابدأ مشروعك اليوم
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                            style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: "12px" }}
                        >
                            أخبرنا عن براندك
                        </motion.h2>
                        <motion.div
                            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ width: "60px", height: "4px", background: "linear-gradient(90deg, #C9A84C, #F0C040)", borderRadius: "2px", margin: "0 auto 16px", transformOrigin: "center" }}
                        />
                        <motion.p
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
                            style={{ color: "#666", fontSize: "1rem" }}
                        >
                            سنتواصل معك خلال 24 ساعة بعرض مخصص
                        </motion.p>
                    </div>

                    {/* ── Form Card ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                        style={{
                            background: "linear-gradient(135deg, rgba(201,168,76,0.04), rgba(0,0,0,0))",
                            border: "1px solid rgba(201,168,76,0.15)",
                            borderRadius: "28px",
                            padding: "clamp(28px, 4vw, 48px) clamp(28px, 4vw, 52px)",
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

                            {/* Row 1: Name + Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-white/80 mb-2">
                                        الاسم الكامل <span style={{ color: "#ef4444" }}>*</span>
                                    </label>
                                    <input
                                        {...register("fullName")}
                                        placeholder="اسمك الكامل"
                                        style={errors.fullName ? errorInput : baseInput}
                                        {...focusHandlers(!!errors.fullName)}
                                    />
                                    <FieldError msg={errors.fullName?.message} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-white/80 mb-2">
                                        رقم الهاتف <span style={{ color: "#ef4444" }}>*</span>
                                    </label>
                                    <input
                                        {...register("phone")}
                                        type="tel" dir="ltr"
                                        placeholder="05XXXXXXXX"
                                        style={{ ...(errors.phone ? errorInput : baseInput), textAlign: "right" as const }}
                                        {...focusHandlers(!!errors.phone)}
                                    />
                                    <FieldError msg={errors.phone?.message} />
                                </div>
                            </div>

                            {/* Row 2: Email + Brand Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-white/80 mb-2">
                                        البريد الإلكتروني
                                    </label>
                                    <input
                                        {...register("email")}
                                        type="email" dir="ltr"
                                        placeholder="example@email.com"
                                        style={{ ...(errors.email ? errorInput : baseInput), textAlign: "right" as const }}
                                        {...focusHandlers(!!errors.email)}
                                    />
                                    <FieldError msg={errors.email?.message} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-white/80 mb-2">
                                        اسم البراند <span style={{ color: "#ef4444" }}>*</span>
                                    </label>
                                    <input
                                        {...register("brandName")}
                                        placeholder="اسم علامتك التجارية"
                                        style={errors.brandName ? errorInput : baseInput}
                                        {...focusHandlers(!!errors.brandName)}
                                    />
                                    <FieldError msg={errors.brandName?.message} />
                                </div>
                            </div>

                            {/* Row 3: Description */}
                            <div>
                                <label className="block text-sm font-bold text-white/80 mb-2">
                                    وصف البراند <span style={{ color: "#ef4444" }}>*</span>
                                </label>
                                <textarea
                                    {...register("description")}
                                    rows={3}
                                    placeholder="اشرح لنا نشاطك التجاري وما تقدمه..."
                                    style={{ ...(errors.description ? errorInput : baseInput), resize: "none" as const }}
                                    {...focusHandlers(!!errors.description)}
                                />
                                <FieldError msg={errors.description?.message} />
                            </div>

                            {/* Row 4: Instagram + Facebook */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-white/80 mb-2">
                                        <span className="inline-flex items-center gap-2">
                                            <Instagram size={16} color="#C9A84C" />
                                            رابط الإنستغرام
                                        </span>
                                    </label>
                                    <input
                                        {...register("instagramUrl")}
                                        type="url" dir="ltr"
                                        placeholder="https://instagram.com/yourbrand"
                                        style={{ ...(errors.instagramUrl ? errorInput : baseInput), textAlign: "right" as const }}
                                        {...focusHandlers(!!errors.instagramUrl)}
                                    />
                                    <FieldError msg={errors.instagramUrl?.message} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-white/80 mb-2">
                                        <span className="inline-flex items-center gap-2">
                                            <Facebook size={16} color="#C9A84C" />
                                            رابط الفيسبوك
                                        </span>
                                    </label>
                                    <input
                                        {...register("facebookUrl")}
                                        type="url" dir="ltr"
                                        placeholder="https://facebook.com/yourbrand"
                                        style={{ ...(errors.facebookUrl ? errorInput : baseInput), textAlign: "right" as const }}
                                        {...focusHandlers(!!errors.facebookUrl)}
                                    />
                                    <FieldError msg={errors.facebookUrl?.message} />
                                </div>
                            </div>

                            {/* Row 5: Has Logo */}
                            <div>
                                <label className="block text-sm font-bold text-white/80 mb-3">
                                    هل لديك شعار (لوغو) جاهز؟ <span style={{ color: "#ef4444" }}>*</span>
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        { value: "yes" as const, icon: <CheckCircle2 size={20} color="#C9A84C" />, title: "نعم", sub: "لدي لوغو جاهز" },
                                        { value: "no" as const, icon: <PenTool size={20} color="#C9A84C" />, title: "لا، أحتاج تصميم", sub: "سنساعدك في التصميم" },
                                    ].map((opt) => (
                                        <label
                                            key={opt.value}
                                            className="relative flex flex-col items-center gap-1 cursor-pointer rounded-xl transition-all duration-200"
                                            style={{
                                                padding: "18px 14px",
                                                border: hasLogo === opt.value
                                                    ? "1.5px solid #C9A84C"
                                                    : "1.5px solid rgba(255,255,255,0.08)",
                                                backgroundColor: hasLogo === opt.value
                                                    ? "rgba(201,168,76,0.06)"
                                                    : "rgba(255,255,255,0.02)",
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                value={opt.value}
                                                {...register("hasLogo")}
                                                className="sr-only"
                                            />
                                            <span style={{ marginBottom: "8px" }}>{opt.icon}</span>
                                            <span className="text-white font-bold text-sm">{opt.title}</span>
                                            <span className="text-[#666] text-xs">{opt.sub}</span>
                                        </label>
                                    ))}
                                </div>
                                <FieldError msg={errors.hasLogo?.message} />
                            </div>

                            {/* Row 6: Conditional file upload */}
                            <AnimatePresence>
                                {hasLogo === "yes" && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35 }}
                                        className="overflow-hidden"
                                    >
                                        <label className="block text-sm font-bold text-white/80 mb-2">رفع اللوغو</label>
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
                                                className="w-full cursor-pointer flex flex-col items-center justify-center gap-2 transition-all duration-200"
                                                style={{
                                                    border: "2px dashed rgba(201,168,76,0.3)",
                                                    borderRadius: "16px",
                                                    padding: "28px 18px",
                                                    backgroundColor: "rgba(201,168,76,0.03)",
                                                    color: "#666",
                                                    fontSize: "0.9rem",
                                                }}
                                                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#C9A84C"; (e.currentTarget as HTMLButtonElement).style.color = "#C9A84C"; }}
                                                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.3)"; (e.currentTarget as HTMLButtonElement).style.color = "#666"; }}
                                            >
                                                <Upload size={32} color="#555" strokeWidth={1.5} />
                                                اسحب الملف هنا أو انقر للرفع
                                                <span style={{ fontSize: "0.75rem", color: "#555" }}>حد أقصى 5MB</span>
                                            </button>
                                        ) : (
                                            <div
                                                className="flex items-center gap-4"
                                                style={{
                                                    border: "1.5px solid #C9A84C",
                                                    borderRadius: "12px",
                                                    padding: "12px 16px",
                                                    backgroundColor: "rgba(201,168,76,0.04)",
                                                }}
                                            >
                                                {preview && (
                                                    <div
                                                        className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden"
                                                        style={{ border: "1px solid rgba(255,255,255,0.1)", backgroundImage: `url(${preview})`, backgroundSize: "cover", backgroundPosition: "center" }}
                                                    />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-white truncate">{selectedFile.name}</p>
                                                    <p className="text-xs text-[#888]">{(selectedFile.size / 1024).toFixed(0)} KB</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={clearFile}
                                                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                                                    style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444", border: "none" }}
                                                >
                                                    <X size={16} strokeWidth={3} />
                                                </button>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Row 7: Notes */}
                            <div>
                                <label className="block text-sm font-bold text-white/80 mb-2">ملاحظات إضافية</label>
                                <textarea
                                    {...register("notes")}
                                    rows={3}
                                    placeholder="أي تفاصيل إضافية تريد إضافتها..."
                                    style={{ ...baseInput, resize: "none" as const }}
                                    onFocus={(e) => { e.currentTarget.style.borderColor = "#C9A84C"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.12)"; }}
                                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                                />
                            </div>

                            {/* Submit */}
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
                                    fontSize: "1.05rem",
                                    fontFamily: "'Cairo', sans-serif",
                                    opacity: isLoading ? 0.8 : 1,
                                }}
                                onMouseEnter={(e) => {
                                    if (!isLoading) {
                                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(201,168,76,0.4)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                                }}
                            >
                                {isLoading ? <><Spinner /> جاري الإرسال...</> : <>إرسال الطلب <Send size={18} /></>}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
