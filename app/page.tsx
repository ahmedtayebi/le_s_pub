import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ProductCards from "@/components/sections/ProductCards";
import SpecsAccordion from "@/components/sections/SpecsAccordion";
import OrderForm from "@/components/sections/OrderForm";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import FadeInSection from "@/components/ui/FadeInSection";
import ScrollProgress from "@/components/ui/ScrollProgress";
import WaveDivider from "@/components/ui/WaveDivider";

// export const metadata: Metadata = {
//   title: "Le_S_Pub | تصميم وطباعة أكياس فاخرة في الجزائر",
//   description:
//     "نصنع لك أكياس ورقية وقماشية بطباعة فاخرة تعكس هوية علامتك التجارية. جودة عالية، تسليم سريع في كل أنحاء الجزائر. اطلب الآن!",
// };

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollProgress />

      <FadeInSection direction="up" delay={0}>
        <HeroSection />
      </FadeInSection>

      <WaveDivider topColor="#1C1C1C" bottomColor="#F9F9F7" />

      <FadeInSection direction="up" delay={0.1}>
        <ProductCards />
      </FadeInSection>

      <WaveDivider topColor="#F9F9F7" bottomColor="#141414" flipped />

      <FadeInSection direction="up" delay={0}>
        <SpecsAccordion />
      </FadeInSection>

      <WaveDivider topColor="#141414" bottomColor="#FAFAF7" />

      <FadeInSection direction="up" delay={0.1}>
        <OrderForm />
      </FadeInSection>

      <Footer />
    </>
  );
}
