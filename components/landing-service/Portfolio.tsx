"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

/* ─────────────────────────────────────────────
   Portfolio Data
   ───────────────────────────────────────────── */

type Project = {
    id: number;
    brandName: string;
    category: string;
    accent: string;
    image: string;
    link: string;
    tags: string[];
};

const portfolios: Project[] = [
    {
        id: 1,
        brandName: "Luxors",
        category: "بيع الروائح",
        accent: "#11998e",
        image: "/p1.png",
        link: "https://luxoradz.netlify.app/",
        tags: ["E-commerce", "Luxury"],
    },
    {
        id: 2,
        brandName: "Be Queen DZ",
        category: "أزياء نسائية",
        accent: "#C9A84C",
        image: "/pp2.png",
        link: "https://www.bequeencollection.com/",
        tags: ["Fashion", "Brand"],
    },
    {
        id: 3,
        brandName: "Kella Orpin",
        category: "موقع صيدلية",
        accent: "#6d4c41",
        image: "/pp3.png",
        link: "https://kella-orpin.vercel.app/",
        tags: ["Healthcare", "Services"],
    },
    {
        id: 4,
        brandName: "Zaki Horse DZ",
        category: "متجر إلكتروني",
        accent: "#8B5A2B",
        image: "/p5.png",
        link: "https://zakihorse-dz.youcan.store/",
        tags: ["E-commerce", "Store"],
    },
];

const GOLD = "#C9A84C";
const GOLD_SOFT = "#F0C040";

// Apple-style easing for sweep transitions
const EASE_SWEEP = [0.32, 0.72, 0, 1] as const;

/* ─────────────────────────────────────────────
   Motion Variants
   ───────────────────────────────────────────── */

// Direction: +1 = forward (next clicked from LEFT peek → new card enters from LEFT)
//            -1 = backward (prev clicked from RIGHT peek → new card enters from RIGHT)
// Physical translateX: positive x = rightward.
const centerVariants: Variants = {
    enter: (dir: number) => ({
        x: dir > 0 ? "-62%" : "62%",
        scale: 0.86,
        opacity: 0,
        rotateY: dir > 0 ? -14 : 14,
        filter: "blur(6px)",
    }),
    center: {
        x: "0%",
        scale: 1,
        opacity: 1,
        rotateY: 0,
        filter: "blur(0px)",
        transition: {
            x: { duration: 0.6, ease: EASE_SWEEP },
            scale: { duration: 0.6, ease: EASE_SWEEP },
            rotateY: { duration: 0.6, ease: EASE_SWEEP },
            opacity: { duration: 0.35, ease: "easeOut" },
            filter: { duration: 0.35, ease: "easeOut" },
        },
    },
    exit: (dir: number) => ({
        x: dir > 0 ? "62%" : "-62%",
        scale: 0.86,
        opacity: 0,
        rotateY: dir > 0 ? 14 : -14,
        filter: "blur(6px)",
        transition: {
            x: { duration: 0.55, ease: EASE_SWEEP },
            scale: { duration: 0.55, ease: EASE_SWEEP },
            rotateY: { duration: 0.55, ease: EASE_SWEEP },
            opacity: { duration: 0.3, ease: "easeIn" },
            filter: { duration: 0.3, ease: "easeIn" },
        },
    }),
};

// Reduced-motion: crossfade only, no spatial travel
const centerVariantsReduced: Variants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

/* ─────────────────────────────────────────────
   Side Peek — frame is static, content crossfades
   ───────────────────────────────────────────── */

function SidePeek({
    project,
    side,
    onClick,
    reducedMotion,
    direction,
}: {
    project: Project;
    side: "left" | "right";
    onClick: () => void;
    reducedMotion: boolean;
    direction: number;
}) {
    const isLeft = side === "left";

    // Parallax nudge drifts with the sweep: forward (dir +1) → content flows leftward
    const parallax = reducedMotion ? 0 : -direction * 10;

    return (
        <motion.button
            type="button"
            aria-label={`عرض مشروع ${project.brandName}`}
            onClick={onClick}
            initial={false}
            animate={{
                x: `${(isLeft ? -74 : 74)}%`,
                scale: 0.82,
                rotateY: reducedMotion ? 0 : isLeft ? 18 : -18,
            }}
            whileHover={reducedMotion ? undefined : { scale: 0.87 }}
            transition={{ type: "spring", stiffness: 160, damping: 22, mass: 0.9 }}
            style={{
                position: "absolute",
                inset: 0,
                margin: "auto",
                width: "min(72%, 460px)",
                aspectRatio: "4 / 5",
                borderRadius: 28,
                overflow: "hidden",
                border: "1px solid rgba(201,168,76,0.18)",
                background: "#fff",
                padding: 0,
                cursor: "pointer",
                transformStyle: "preserve-3d",
                transformOrigin: isLeft ? "right center" : "left center",
                boxShadow: "0 24px 60px rgba(32,26,10,0.16)",
                zIndex: 1,
                willChange: "transform",
            }}
        >
            {/* Image crossfade on project change — frame stays anchored */}
            <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 1.06, x: parallax }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 1.02, x: -parallax }}
                    transition={{
                        opacity: { duration: 0.5, ease: "easeOut" },
                        scale: { duration: 0.7, ease: EASE_SWEEP },
                        x: { duration: 0.6, ease: EASE_SWEEP },
                    }}
                    style={{ position: "absolute", inset: 0 }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={project.image}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                            filter: "brightness(0.55) saturate(0.8)",
                        }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Static scrim */}
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(${isLeft ? "270deg" : "90deg"}, rgba(0,0,0,0.55), rgba(0,0,0,0.15))`,
                    pointerEvents: "none",
                }}
            />
            {/* Accent stripe */}
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    [isLeft ? "left" : "right"]: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: `linear-gradient(180deg, ${GOLD}, ${GOLD_SOFT})`,
                    opacity: 0.9,
                    pointerEvents: "none",
                }}
            />
        </motion.button>
    );
}

/* ─────────────────────────────────────────────
   Featured Card (center) — content swapped inside AnimatePresence by parent
   ───────────────────────────────────────────── */

function FeaturedCard({ project }: { project: Project }) {
    return (
        <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`فتح مشروع ${project.brandName} في نافذة جديدة`}
            style={{
                position: "relative",
                display: "block",
                width: "min(92%, 420px)",
                aspectRatio: "4 / 5",
                borderRadius: 32,
                overflow: "hidden",
                textDecoration: "none",
                background: "#fff",
                border: "1px solid rgba(201,168,76,0.25)",
                boxShadow:
                    "0 36px 80px rgba(32,26,10,0.18), 0 0 0 1px rgba(255,255,255,0.8) inset",
            }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={project.image}
                alt={project.brandName}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />

            <div
                aria-hidden
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                }}
            >
                {project.tags.map((t) => (
                    <span
                        key={t}
                        style={{
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            color: "#fff",
                            padding: "6px 12px",
                            borderRadius: 999,
                            background: "rgba(0,0,0,0.45)",
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            fontFamily: "'Cairo', sans-serif",
                        }}
                    >
                        {t}
                    </span>
                ))}
            </div>

            <div
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: "22px 24px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    gap: 16,
                    fontFamily: "'Cairo', sans-serif",
                }}
            >
                <div style={{ minWidth: 0 }}>
                    <p
                        style={{
                            color: GOLD,
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            letterSpacing: "0.04em",
                            margin: 0,
                            textTransform: "uppercase",
                        }}
                    >
                        {project.category}
                    </p>
                    <h3
                        style={{
                            color: "#fff",
                            fontSize: "1.5rem",
                            fontWeight: 900,
                            margin: "4px 0 0",
                            lineHeight: 1.2,
                        }}
                    >
                        {project.brandName}
                    </h3>
                </div>
                <div
                    style={{
                        flexShrink: 0,
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${GOLD}, ${GOLD_SOFT})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 8px 24px rgba(201,168,76,0.4)",
                    }}
                >
                    <ExternalLink size={20} color="#0a0a0a" strokeWidth={2.5} />
                </div>
            </div>
        </a>
    );
}

/* ─────────────────────────────────────────────
   Main Section
   ───────────────────────────────────────────── */

export default function Portfolio() {
    // Track direction alongside active for direction-aware variants
    const [[active, direction], setState] = useState<[number, number]>([0, 0]);
    const reducedMotion = useReducedMotion() ?? false;
    const count = portfolios.length;

    const go = useCallback(
        (dir: 1 | -1) => setState(([i]) => [(i + dir + count) % count, dir]),
        [count]
    );

    const jumpTo = useCallback(
        (target: number) =>
            setState(([i]) => {
                if (target === i) return [i, 0];
                // Pick shortest direction for the sweep
                const forward = (target - i + count) % count;
                const backward = (i - target + count) % count;
                const dir = forward <= backward ? 1 : -1;
                return [target, dir];
            }),
        [count]
    );

    const current = portfolios[active];
    const prev = useMemo(
        () => portfolios[(active - 1 + count) % count],
        [active, count]
    );
    const next = useMemo(() => portfolios[(active + 1) % count], [active, count]);

    // Track whether the section is on-screen (so keyboard nav only fires when relevant)
    const sectionRef = useRef<HTMLElement>(null);
    const isVisibleRef = useRef(false);
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting;
            },
            { threshold: 0.35 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // Keyboard nav — scoped to when the carousel is visible and no input/textarea is focused.
    // RTL mapping: ← advances (next), → goes back (prev).
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (!isVisibleRef.current) return;
            const t = e.target as HTMLElement | null;
            if (!t) return;
            const tag = t.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || t.isContentEditable) return;
            if (e.key === "ArrowLeft") { go(1); e.preventDefault(); }
            else if (e.key === "ArrowRight") { go(-1); e.preventDefault(); }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [go]);

    // Touch swipe — ref-based (no renders), axis-locked, velocity-aware.
    // Horizontal gesture wins only if |dx| > |dy| AND crosses either a distance (56px) or a flick velocity (~0.4 px/ms).
    const touchRef = useRef<{ x: number; y: number; t: number } | null>(null);
    const onTouchStart = (e: React.TouchEvent) => {
        const t = e.touches[0];
        touchRef.current = { x: t.clientX, y: t.clientY, t: performance.now() };
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        const start = touchRef.current;
        touchRef.current = null;
        if (!start) return;
        const end = e.changedTouches[0];
        const dx = end.clientX - start.x;
        const dy = end.clientY - start.y;
        // Vertical-dominant gesture → let the page scroll, do nothing.
        if (Math.abs(dy) >= Math.abs(dx)) return;
        const elapsed = Math.max(1, performance.now() - start.t);
        const velocity = Math.abs(dx) / elapsed; // px per ms
        const committed = Math.abs(dx) > 56 || velocity > 0.4;
        if (!committed) return;
        go(dx > 0 ? 1 : -1);
    };

    const activeVariants = reducedMotion ? centerVariantsReduced : centerVariants;

    return (
        <section
            id="portfolio"
            dir="rtl"
            ref={sectionRef}
            style={{
                backgroundColor: "#fffaf0",
                padding: "96px 24px 104px",
                fontFamily: "'Cairo', sans-serif",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    top: "20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 620,
                    height: 620,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(201,168,76,0.18), transparent 60%)",
                    filter: "blur(40px)",
                    pointerEvents: "none",
                }}
            />

            <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
                {/* ── Header ── */}
                <div style={{ textAlign: "center", marginBottom: 56 }}>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        style={{
                            color: GOLD,
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            letterSpacing: "0.05em",
                            marginBottom: 12,
                            textTransform: "uppercase",
                        }}
                    >
                        <span
                            style={{
                                display: "inline-block",
                                width: 20,
                                height: 2,
                                background: GOLD,
                                borderRadius: 2,
                                marginLeft: 8,
                                verticalAlign: "middle",
                            }}
                        />
نماذج من اعمالنا
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{
                            color: "#171717",
                            fontWeight: 900,
                            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                            marginBottom: 12,
                        }}
                    >
                        نماذج من تصاميمنا
                    </motion.h2>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            width: 60,
                            height: 4,
                            background: `linear-gradient(90deg, ${GOLD}, ${GOLD_SOFT})`,
                            borderRadius: 2,
                            margin: "0 auto 16px",
                            transformOrigin: "center",
                        }}
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        style={{ color: "#666257", fontSize: "1rem" }}
                    >
                        كل صفحة مصممة خصيصاً لعلامة تجارية مختلفة
                    </motion.p>
                </div>

                {/* ── Stage ── */}
                <div
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    style={{
                        position: "relative",
                        height: "clamp(440px, 62vw, 560px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        perspective: 1600,
                        touchAction: "pan-y",
                    }}
                >
                    {/* Right peek shows prev (RTL: prev sits to the right) */}
                    <SidePeek
                        project={prev}
                        side="right"
                        onClick={() => go(-1)}
                        reducedMotion={reducedMotion}
                        direction={direction}
                    />
                    {/* Left peek shows next */}
                    <SidePeek
                        project={next}
                        side="left"
                        onClick={() => go(1)}
                        reducedMotion={reducedMotion}
                        direction={direction}
                    />

                    {/* Center featured card: direction-aware slide + fade + blur */}
                    <div
                        style={{
                            position: "relative",
                            zIndex: 3,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transformStyle: "preserve-3d",
                        }}
                    >
                        <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                            <motion.div
                                key={current.id}
                                custom={direction}
                                variants={activeVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                style={{
                                    position: "absolute",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%",
                                    height: "100%",
                                    willChange: "transform, opacity, filter",
                                    transformStyle: "preserve-3d",
                                    transformOrigin: "center center",
                                }}
                            >
                                <FeaturedCard project={current} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* ── Controls ── */}
                <div
                    style={{
                        marginTop: 40,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 20,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                        <NavButton
                            ariaLabel="المشروع السابق"
                            onClick={() => go(-1)}
                            icon={<ArrowRight size={20} color="#171717" />}
                        />

                        <div
                            aria-live="polite"
                            style={{
                                color: "#777066",
                                fontSize: "0.9rem",
                                fontWeight: 600,
                                minWidth: 56,
                                textAlign: "center",
                                fontVariantNumeric: "tabular-nums",
                            }}
                        >
                            <span style={{ color: "#171717", fontWeight: 800 }}>
                                {String(active + 1).padStart(2, "0")}
                            </span>
                            <span style={{ margin: "0 6px", color: "#c9b875" }}>/</span>
                            <span>{String(count).padStart(2, "0")}</span>
                        </div>

                        <NavButton
                            ariaLabel="المشروع التالي"
                            onClick={() => go(1)}
                            icon={<ArrowLeft size={20} color="#171717" />}
                        />
                    </div>

                    <div style={{ display: "flex", gap: 10 }} role="tablist" aria-label="اختيار المشروع">
                        {portfolios.map((p, i) => {
                            const isActive = i === active;
                            return (
                                <button
                                    key={p.id}
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-label={`مشروع ${p.brandName}`}
                                    onClick={() => jumpTo(i)}
                                    style={{
                                        width: isActive ? 32 : 10,
                                        height: 10,
                                        borderRadius: 999,
                                        border: "none",
                                        padding: 0,
                                        cursor: "pointer",
                                        background: isActive
                                            ? `linear-gradient(90deg, ${GOLD}, ${GOLD_SOFT})`
                                            : "rgba(23,23,23,0.18)",
                                        transition: "width 0.35s cubic-bezier(0.32, 0.72, 0, 1), background 0.3s ease",
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            <style>{`
                #portfolio button:focus-visible {
                    outline: 2px solid ${GOLD};
                    outline-offset: 3px;
                }
                @media (max-width: 640px) {
                    #portfolio .nav-btn { width: 44px !important; height: 44px !important; }
                }
            `}</style>
        </section>
    );
}

/* ─────────────────────────────────────────────
   Nav Button
   ───────────────────────────────────────────── */

function NavButton({
    onClick,
    icon,
    ariaLabel,
}: {
    onClick: () => void;
    icon: React.ReactNode;
    ariaLabel: string;
}) {
    return (
        <motion.button
            type="button"
            aria-label={ariaLabel}
            onClick={onClick}
            whileHover={{ scale: 1.06, borderColor: GOLD }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="nav-btn"
            style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.86)",
                border: "1px solid rgba(201,168,76,0.22)",
                boxShadow: "0 10px 24px rgba(32,26,10,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: 0,
            }}
        >
            {icon}
        </motion.button>
    );
}
