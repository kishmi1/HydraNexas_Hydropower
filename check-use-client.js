const fs = require('fs');
const path = require('path');

const files = [
  'src/frontend/pages/Projects/AllProjects/AllProjects.jsx',
  'src/frontend/pages/Projects/CompletedProjects/CompletedProjects.jsx',
  'src/frontend/pages/Projects/OngoingProjects/OngoingProjects.jsx',
  'src/frontend/pages/Projects/UpcomingProjects/UpcomingProjects.jsx',
  'src/frontend/pages/Projects/ProjectDetails/ProjectDetails.jsx',
  'src/frontend/pages/careers/InternshipProgram/InternshipProgram.jsx',
  'src/frontend/pages/news/LatestNews/LatestNews.jsx',
  'src/frontend/pages/news/NewsDetails/NewsDetails.jsx',
  'src/frontend/pages/news/Events/Events.jsx',
  'src/frontend/pages/ebidding/ActiveTenders/ActiveTenders.jsx',
  'src/frontend/pages/ebidding/AwardNotices/AwardNotices.jsx',
  'src/frontend/pages/ebidding/TenderDocuments/TenderDocuments.jsx',
  'src/frontend/pages/ebidding/TenderNotices/TenderNotices.jsx',
  'src/frontend/pages/investor/AnnualReports/AnnualReports.jsx',
  'src/frontend/pages/investor/CorporateGovernance/CorporateGovernance.jsx',
  'src/frontend/pages/investor/Downloads/Downloads.jsx',
  'src/frontend/pages/investor/FinancialHighlights/FinancialHighlights.jsx',
  'src/frontend/pages/investor/ShareInformation/ShareInformation.jsx',
  'src/frontend/pages/news/MediaGallery/MediaGallery.jsx',
  'src/app/dashboard/investor/financial-highlights/page.jsx',
  'src/app/dashboard/about/leadership-team/page.jsx',
  'src/app/dashboard/about/board-directors/page.jsx',
  'src/frontend/components/home/LiveDashboard/LiveDashboard.jsx',
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if has React hooks
    const hasHooks = content.includes('useState(') || content.includes('useEffect(') || 
                    content.includes('useRef(') || content.includes('useCallback(') ||
                    content.includes('useMemo(') || content.includes('useContext(');
    
    // Check if has "use client"
    const hasUseClient = content.includes('"use client"') || content.includes("'use client'");
    
    if (hasHooks && !hasUseClient) {
      console.log(`❌ ${file}: Has React hooks but missing "use client"`);
    } else if (hasHooks && hasUseClient) {
      console.log(`✅ ${file}: Has React hooks and "use client"`);
    } else if (!hasHooks && hasUseClient) {
      console.log(`⚠️  ${file}: Has "use client" but no React hooks`);
    } else {
      console.log(`ℹ️  ${file}: No React hooks, no "use client"`);
    }
  } else {
    console.log(`❌ Not found: ${file}`);
  }
});
