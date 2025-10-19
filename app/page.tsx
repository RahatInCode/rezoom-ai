import HeroSection from "./Components/HeroSection/HeroSection";
import TemplateSlider from "./Components/TemplateSlider/TemplateSlider";
import AIChatSection from "./Components/AIChatSection/AIChatSection";
import HighlightFeature from "./Components/HighlightFeature/HighlightFeature";
import ResumeShowcase from "./Components/ResumeShowcase/ResumeShowcase";
import ReviewSection from "./Components/ReviewSection/ReviewSection";
import HeroMediaSection from "./Components/HeroMediaSection/HeroMediaSection";
import FAQ from "./Components/FAQ/FAQ";
import PricingSection from "./pricing-section/PricingSection";
import FeaturesSection from "./Components/FeaturesSection/FeaturesSection";


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
      <FAQ />
    </main>
  );
}

