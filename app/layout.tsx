import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "أكياس مطبوعة | تصميم وطباعة أكياس فاخرة في الجزائر",
  description:
    "نصنع لك أكياس ورقية وقماشية بطباعة فاخرة تعكس هوية علامتك التجارية. جودة عالية، تسليم سريع في كل أنحاء الجزائر. اطلب الآن!",
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
      </body>
    </html>
  );
}
