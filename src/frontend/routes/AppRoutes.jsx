import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import ScrollToTop from "../components/common/ScrollToTop/ScrollToTop";
import Home from "../pages/Home/Home";

// About
import CompanyOverview from "../pages/About/CompanyOverview/CompanyOverview";
import VisionMission from "../pages/About/VisionMission/VisionMission";
import BoardOfDirectors from "../pages/About/BoardOfDirectors/BoardOfDirectors";
import LeadershipTeam from "../pages/About/LeadershipTeam/LeadershipTeam";
import CompanyHistory from "../pages/About/CompanyHistory/CompanyHistory";
import AwardsRecognition from "../pages/About/AwardsRecognition/AwardsRecognition";

// Projects
import AllProjects from "../pages/Projects/AllProjects/AllProjects";
import OngoingProjects from "../pages/Projects/OngoingProjects/OngoingProjects";
import CompletedProjects from "../pages/Projects/CompletedProjects/CompletedProjects";
import UpcomingProjects from "../pages/Projects/UpcomingProjects/UpcomingProjects";
import ProjectMap from "../pages/Projects/ProjectMap/ProjectMap";
import ProjectDetails from "../pages/Projects/ProjectDetails/ProjectDetails";


import FinancialHighlights from "../pages/investor/FinancialHighlights/FinancialHighlights";
import AnnualReports from "../pages/investor/AnnualReports/AnnualReports";
import ShareInformation from "../pages/investor/ShareInformation/ShareInformation";
import CorporateGovernance from "../pages/investor/CorporateGovernance/CorporateGovernance";
import Downloads from "../pages/investor/Downloads/Downloads";

import LatestNews from "../pages/news/LatestNews/LatestNews";
import Events from "../pages/news/Events/Events";
import PressReleases from "../pages/news/PressReleases/PressReleases";
import MediaGallery from "../pages/news/MediaGallery/MediaGallery";
import NewsDetails from "../pages/news/NewsDetails/NewsDetails";
import EventDetails from "../pages/news/EventDetails/EventDetails";
import ActiveTenders from "../pages/ebidding/ActiveTenders/ActiveTenders";
import TenderDetails from "../pages/ebidding/TenderDetails/TenderDetails";

import TenderNotices from "../pages/ebidding/TenderNotices/TenderNotices";
import TenderDocuments from "../pages/ebidding/TenderDocuments/TenderDocuments";
import VendorRegistration from "../pages/ebidding/VendorRegistration/VendorRegistration";
import AwardNotices from "../pages/ebidding/AwardNotices/AwardNotices";

import LifeAtHydraNexa from "../pages/careers/LifeAtHydraNexa/LifeAtHydraNexa";
import CurrentOpenings from "../pages/careers/CurrentOpenings/CurrentOpenings";
import InternshipProgram from "../pages/careers/InternshipProgram/InternshipProgram";
import ApplyNow from "../pages/careers/ApplyNow/ApplyNow";
import Contact from "../pages/contact/Contact";
export default function AppRoutes() {
  return (
         <>

      <ScrollToTop />
    <Routes>

      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />

        {/* About */}

        <Route
          path="/about/company-overview"
          element={<CompanyOverview />}
        />

        <Route
          path="/about/vision-mission"
          element={<VisionMission />}
        />

        <Route
          path="/about/board-of-directors"
          element={<BoardOfDirectors />}
        />

        <Route
          path="/about/leadership-team"
          element={<LeadershipTeam />}
        />

        <Route
          path="/about/company-history"
          element={<CompanyHistory />}
        />

        <Route
          path="/about/awards-recognition"
          element={<AwardsRecognition />}
        />

        {/* Projects */}
<Route
  path="/projects"
  element={<AllProjects />}
/>
       <Route
  path="/projects/:id"
  element={<ProjectDetails />}
/>
        <Route
  path="/projects/ongoing"
  element={<OngoingProjects />}
/>

<Route
  path="/projects/completed"
  element={<CompletedProjects />}
/>
<Route
  path="/projects/upcoming"
  element={<UpcomingProjects />}
/>
<Route
  path="/projects/project-map"
  element={<ProjectMap />}
/>

<Route
  path="/investor/financial-highlights"
  element={<FinancialHighlights />}
/>

<Route
  path="/investor/annual-reports"
  element={<AnnualReports />}
/>

<Route
  path="/investor/share-information"
  element={<ShareInformation />}
/>

<Route
  path="/investor/corporate-governance"
  element={<CorporateGovernance />}
/>
<Route
  path="/investor/downloads"
  element={<Downloads />}
/>

<Route
  path="/news/latest-news"
  element={<LatestNews />}
/>
 <Route path="/news/:id" element={<NewsDetails />} />
<Route
  path="/news/events"
  element={<Events />}
/>
  <Route
        path="/events/:id"
        element={<EventDetails />}
    />

<Route
  path="/news/press-releases"
  element={<PressReleases />}
/>

<Route
  path="/news/media-gallery"
  element={<MediaGallery />}
/>

<Route
  path="/ebidding/active-tenders"
  element={<ActiveTenders/>}
  />
  <Route
    path="/tenders/:id"
    element={<TenderDetails />}
/>
<Route
    path="/ebidding/tender-notices"
    element={<TenderNotices />}
/>
<Route
  path="/ebidding/tender-documents"
  element={<TenderDocuments />}
/>
<Route
  path="/ebidding/vendor-registration"
  element={<VendorRegistration />}
/>
<Route
  path="/ebidding/award-notices"
  element={<AwardNotices />}
/>

<Route
  path="/careers/life-at-hydranexa"
  element={<LifeAtHydraNexa />}
/>
<Route
  path="/careers/current-openings"
  element={<CurrentOpenings />}
/>

<Route
  path="/careers/internship"
  element={<InternshipProgram />}
/>

<Route
  path="/careers/apply-now"
  element={<ApplyNow />}
/>
<Route
    path="/contact"
    element={<Contact />}
/>
      </Route>

    </Routes>
    </>
  );
}
