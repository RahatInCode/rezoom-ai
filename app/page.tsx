import AIChatSection from "./Components/AIChatSection/AIChatSection";
import FAQ from "./Components/FAQ/FAQ";
import FeaturesSection from "./Components/FeaturesSection/FeaturesSection";
import HeroMediaSection from "./Components/HeroMediaSection/HeroMediaSection";
import HeroSection from "./Components/HeroSection/HeroSection";
import ResumeShowcase from "./Components/ResumeShowcase/ResumeShowcase";
import ReviewSection from "./Components/ReviewSection/ReviewSection";
import TemplateSlider from "./Components/TemplateSlider/TemplateSlider";




export default function Home() {
  return (
    <main>
      <HeroSection />
      <TemplateSlider/>
      <AIChatSection/>
      <FeaturesSection/>
      <ResumeShowcase/>
      <ReviewSection/>
      <HeroMediaSection/>
      <FAQ/>
    </main>
  );
}
