import Hero from "../frontend/components/home/Hero/Hero";
import Stats from "../frontend/components/home/Stats/Stats";
import CompanyOverview from "../frontend/components/home/CompanyOverview/CompanyOverview";
import FeaturedProjects from "../frontend/components/home/FeaturedProjects/FeaturedProjects";
import Sustainability from "../frontend/components/home/Sustainability/Sustainability";
import InvestorHighlights from "../frontend/components/home/InvestorHighlights/InvestorHighlights";
import LatestNews from "../frontend/components/home/LatestNews/LatestNews";
import CTASection from "../frontend/components/home/CTASection/CTASection";
import LiveDashboard from "../frontend/components/home/LiveDashboard/LiveDashboard";
import FrontendLayout from "./frontend-layout";

export default function HomePage() {
  return (
    <FrontendLayout>
      <Hero />
      <Stats />
      <CompanyOverview />
      <FeaturedProjects />
      <LiveDashboard/>
      <Sustainability/>
      <InvestorHighlights/>
      <LatestNews/>
      <CTASection/>
    </FrontendLayout>
  );
}