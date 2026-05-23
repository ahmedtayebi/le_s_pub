import Image from "next/image";
import { ExternalLink, MessageCircle } from "lucide-react";

const projects = [
    {
        brandName: "Luxors",
        category: "بيع الروائح",
        image: "/p1.png",
        link: "https://luxoradz.netlify.app/",
    },
    {
        brandName: "Be Queen DZ",
        category: "أزياء نسائية",
        image: "/pp2.png",
        link: "https://www.bequeencollection.com/",
    },
    {
        brandName: "Kella Orpin",
        category: "موقع صيدلية",
        image: "/pp3.png",
        link: "https://kella-orpin.vercel.app/",
    },
    {
        brandName: "Zaki Horse DZ",
        category: "متجر إلكتروني",
        image: "/p5.png",
        link: "https://zakihorse-dz.youcan.store/",
    },
];

export default function LandingServicePage() {
    return (
        <main
            dir="rtl"
            className="min-h-screen bg-[#f8f7f2] px-4 pb-20 pt-5 text-[#151515] sm:px-6 sm:pt-6 lg:px-8"
        >
            <header className="mx-auto flex max-w-3xl flex-col items-center text-center">
                <Image
                    src="/logo.png"
                    alt="Le S Publicité"
                    width={124}
                    height={66}
                    priority
                    className="h-auto w-[104px] object-contain sm:w-[124px]"
                />

                <h1 className="mt-3 text-balance text-2xl font-black leading-[1.3] sm:text-3xl">
                    أعمالنا تتكلم قبلنا
                </h1>

                <p className="mt-1.5 max-w-md text-pretty text-sm leading-6 text-[#64615a]">
                    نماذج مختارة من صفحات ومواقع صممناها لعلامات مختلفة.
                </p>
            </header>

            <section
                aria-label="نماذج من أعمالنا"
                className="mx-auto mt-6 flex max-w-5xl flex-col gap-4 sm:mt-8"
            >
                {projects.map((project, index) => (
                    <a
                        key={project.brandName}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block overflow-hidden rounded-lg border border-[#ded8c7] bg-[#ece7da] shadow-[0_14px_34px_rgba(26,21,12,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#c9a84c] hover:shadow-[0_22px_50px_rgba(26,21,12,0.14)]"
                    >
                        <div className="relative aspect-[1920/889] w-full overflow-hidden">
                            <Image
                                src={project.image}
                                alt={project.brandName}
                                fill
                                sizes="(min-width: 1280px) 1024px, calc(100vw - 32px)"
                                className="object-cover transition duration-500 group-hover:scale-[1.015]"
                            />
                        </div>

                        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4 pt-16 sm:p-5 sm:pt-20">
                            <div className="flex items-end justify-between gap-3">
                                <div className="min-w-0 text-white">
                                    <span className="text-[0.68rem] font-bold text-[#f0c040] sm:text-xs">
                                        {String(index + 1).padStart(2, "0")} · {project.category}
                                    </span>

                                    <h2 className="mt-1 truncate text-xl font-black leading-tight sm:text-3xl">
                                        {project.brandName}
                                    </h2>
                                </div>

                                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/90 text-[#151515] shadow-[0_8px_22px_rgba(0,0,0,0.25)] transition duration-300 group-hover:bg-[#c9a84c] sm:h-11 sm:w-11">
                                    <ExternalLink size={17} strokeWidth={2.4} />
                                </span>
                            </div>
                        </div>
                    </a>
                ))}
            </section>

            <footer className="mx-auto mt-9 max-w-5xl border-t border-[#ded8c7] py-5 text-center text-xs text-[#777166]">
                © {new Date().getFullYear()} Le S Publicité
            </footer>

            <a
                href="https://wa.me/213777640477"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تواصل معنا عبر واتساب"
                className="fixed bottom-4 left-4 z-50 inline-flex items-center gap-2 rounded-full border border-white/40 bg-[#25D366] px-4 py-3 text-sm font-black text-white shadow-[0_12px_32px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1fbd59]"
            >
                <MessageCircle size={18} strokeWidth={2.5} />
                واتساب
            </a>
        </main>
    );
}
