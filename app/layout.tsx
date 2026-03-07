import type { Metadata } from "next";
import "./globals.css";

// export const metadata: Metadata = {
//   title: "Le_S_Pub  ",
//   description:
//     "نصنع لك أكياس ورقية وقماشية بطباعة فاخرة تعكس هوية علامتك التجارية. جودة عالية، تسليم سريع في كل أنحاء الجزائر. اطلب الآن!",
// };

export const metadata: Metadata = {
  metadataBase: new URL("https://le-s-pub.vercel.app"),

  title: {
    default: "Le S Pub | أكياس مطبوعة فاخرة في الجزائر",
    template: "%s | Le S Pub",
  },

  description:
    "نصنع لك أكياس ورقية وقماشية بطباعة فاخرة تعكس هوية علامتك التجارية. جودة عالية وتسليم سريع في جميع أنحاء الجزائر.",

  keywords: [
    "أكياس مطبوعة",
    "طباعة أكياس",
    "أكياس ورقية",
    "أكياس قماش",
    "أكياس فاخرة في الجزائر",
  ],

  openGraph: {
    title: "Le S Pub | تصميم وطباعة أكياس فاخرة في الجزائر",
    description:
      "هوية تجارية قوية تبدأ من تفاصيل التغليف. اطلب الآن أكياس مطبوعة بجودة عالية وتسليم سريع.",
    url: "https://le-s-pub.vercel.app",
    siteName: "Le S Pub",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Le S Pub - أكياس مطبوعة فاخرة",
      },
    ],
    locale: "ar_DZ",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Le S Pub | أكياس مطبوعة فاخرة",
    description:
      "تصميم وطباعة أكياس احترافية تعكس قوة علامتك التجارية.",
    images: ["/preview.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <main>{children}</main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Le S Pub",
              url: "https://le-s-pub.vercel.app",
              logo: "https://le-s-pub.vercel.app/preview.png",
              description:
                "تصميم وطباعة أكياس ورقية وقماشية فاخرة في الجزائر بجودة عالية.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "DZ",
              },
              sameAs: [
                "https://facebook.com/yourpage",
                "https://instagram.com/yourpage"
              ]
            }),
          }}
        />
      </body>
    </html>
  );
}
