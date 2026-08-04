import Hero from "../../components/home/Hero/Hero";
import Stats from "../../components/home/Stats/Stats";
import CompanyOverview from "../../components/home/CompanyOverview/CompanyOverview";
import FeaturedProjects from "../../components/home/FeaturedProjects/FeaturedProjects";
import Sustainability from "../../components/home/Sustainability/Sustainability";
import InvestorHighlights from "../../components/home/InvestorHighlights/InvestorHighlights";
import LatestNews from "../../components/home/LatestNews/LatestNews";
import CTASection from "../../components/home/CTASection/CTASection";
import LiveDashboard from "../../components/home/LiveDashboard/LiveDashboard";
import ChatBot from "../../components/common/ChatBot/ChatBot";
export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <CompanyOverview />
      <FeaturedProjects />
      <LiveDashboard/>
      <Sustainability/>
      <InvestorHighlights/>
      <LatestNews/>
      <CTASection/>
      <ChatBot/>
    </>
  );
}
