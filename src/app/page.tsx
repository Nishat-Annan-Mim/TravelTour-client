import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedTours from "@/components/FeaturedTours";
import HowItWorks from "@/components/HowItWorks";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import Newsletter from "@/components/Newsletter";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <main className="flex-1">
      <Hero />
      <Categories />
      <FeaturedTours />
      <HowItWorks />
      <StatsSection />
      <Testimonials />
      <FAQSection />
      <Newsletter />
      <CTASection />
    </main>
  );
}
