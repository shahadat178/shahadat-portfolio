import { PortfolioInsightRail } from "@/components/layout/PortfolioInsightRail";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { StorySection } from "@/components/sections/StorySection";
import { ToolkitSection } from "@/components/sections/ToolkitSection";
import { WorkSection } from "@/components/sections/WorkSection";

export default function Home() {
  return (
    <PortfolioPage insightRail={<PortfolioInsightRail />}>
      <HeroSection />
      <WorkSection />
      <StorySection />
      <ExperienceSection />
      <ToolkitSection />
      <ContactSection />
    </PortfolioPage>
  );
}
