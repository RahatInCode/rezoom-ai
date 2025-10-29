import HeroSection from "./Components/HomePages/HeroSection/HeroSection";
import TemplateSlider from "./Components/HomePages/TemplateSlider/TemplateSlider";
import AIChatSection from "./Components/HomePages/AIChatSection/AIChatSection";
import HighlightFeature from "./Components/HomePages/HighlightFeature/HighlightFeature";
import ResumeShowcase from "./Components/HomePages/ResumeShowcase/ResumeShowcase";
import ReviewSection from "./Components/HomePages/ReviewSection/ReviewSection";
import HeroMediaSection from "./Components/HomePages/HeroMediaSection/HeroMediaSection";
import FAQ from "./Components/HomePages/FAQ/FAQ";
import PricingSection from "./Components/HomePages/pricing-section/PricingSection";
import FeaturesSection from "./Components/HomePages/FeaturesSection/FeaturesSection";
import MarqueeSection from "./Components/HomePages/marquee/MarqueeSection";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <TemplateSlider />
      <AIChatSection />
      <FeaturesSection />
      <HighlightFeature />
      <ResumeShowcase />
      <ReviewSection />
      <HeroMediaSection />
      <PricingSection />
      <MarqueeSection />
      <FAQ />
    </main>
  );
}

