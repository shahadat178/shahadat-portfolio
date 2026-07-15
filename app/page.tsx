import { PortfolioFooter } from "@/components/layout/PortfolioFooter";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { EngineeringDepthSection } from "@/components/sections/EngineeringDepthSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowIWorkSection } from "@/components/sections/HowIWorkSection";
import { PortfolioStatsStrip } from "@/components/sections/PortfolioStatsStrip";
import { StorySection } from "@/components/sections/StorySection";
import { ToolkitSection } from "@/components/sections/ToolkitSection";
import { WorkSection } from "@/components/sections/WorkSection";

export default function Home() {
  return (
    <PortfolioPage>
      <HeroSection />
      <PortfolioStatsStrip />
      <WorkSection />
      <EngineeringDepthSection />
      <StorySection />
      <ExperienceSection />
      <HowIWorkSection />
      <ToolkitSection />
      <AchievementsSection />
      <ContactSection />
      <PortfolioFooter />
    </PortfolioPage>
  );
}
