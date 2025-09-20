import AIChatSection from "./Components/AIChatSection/AIChatSection";
import FAQ from "./Components/FAQ/FAQ";
import FeaturesSection from "./Components/FeaturesSection/FeaturesSection";
import HeroSection from "./Components/HeroSection/HeroSection";
import ReviewSection from "./Components/ReviewSection/ReviewSection";
import TemplateSlider from "./Components/TemplateSlider/TemplateSlider";




export default function Home() {
  return (
    <main>
      <HeroSection />
      <TemplateSlider/>
      <AIChatSection/>
      <FeaturesSection/>
      <ReviewSection/>
      <FAQ/>
    </main>
  );
}
