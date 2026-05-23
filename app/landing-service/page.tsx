import Image from "next/image";
import { ExternalLink } from "lucide-react";

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
            className="min-h-screen bg-[#f8f7f2] px-4 py-10 text-[#151515] sm:px-6 lg:px-8"
        >
            <header className="mx-auto flex max-w-5xl flex-col items-center text-center">
                <Image
                    src="/logo.png"
                    alt="Le S Publicité"
                    width={170}
                    height={90}
                    priority
                    className="h-auto w-[150px] object-contain sm:w-[170px]"
                />

                <h1 className="mt-5 text-balance text-2xl font-black leading-[1.35] sm:text-4xl">
                    أعمالنا تتكلم قبلنا
                </h1>

                <p className="mt-3 max-w-md text-pretty text-sm leading-7 text-[#64615a] sm:text-base">
                    صفحات رقمية بسيطة، واضحة، ومصممة لتترك انطباعًا محترفًا من أول نظرة.
                </p>
            </header>

            <section
                aria-label="نماذج من أعمالنا"
                className="mx-auto mt-12 flex max-w-5xl flex-col gap-5 sm:mt-16"
            >
                {projects.map((project, index) => (
                    <a
                        key={project.brandName}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group grid overflow-hidden rounded-lg border border-[#ded8c7] bg-white shadow-[0_18px_45px_rgba(26,21,12,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#c9a84c] hover:shadow-[0_24px_60px_rgba(26,21,12,0.12)] lg:grid-cols-[minmax(0,1fr)_360px]"
                    >
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#ece7da] lg:order-2 lg:aspect-auto lg:min-h-[260px]">
                            <Image
                                src={project.image}
                                alt={project.brandName}
                                fill
                                sizes="(min-width: 1024px) 360px, 100vw"
                                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                            />
                        </div>

                        <div className="flex min-h-[190px] flex-col justify-between p-6 sm:p-8 lg:order-1">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a7b28]">
                                    {String(index + 1).padStart(2, "0")} / {project.category}
                                </span>

                                <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                                    {project.brandName}
                                </h2>
                            </div>

                            <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-md border border-[#151515] px-4 py-2 text-sm font-bold transition duration-300 group-hover:border-[#c9a84c] group-hover:bg-[#c9a84c] group-hover:text-black">
                                مشاهدة المشروع
                                <ExternalLink size={16} strokeWidth={2.4} />
                            </span>
                        </div>
                    </a>
                ))}
            </section>

            <footer className="mx-auto mt-12 max-w-5xl border-t border-[#ded8c7] py-6 text-center text-xs text-[#777166]">
                © {new Date().getFullYear()} Le S Publicité
            </footer>
        </main>
    );
}
