const fs = require('fs');
const path = require('path');

const files = [
  'src/frontend/pages/news/MediaGallery/MediaGallery.jsx',
  'src/frontend/pages/contact/Contact.jsx',
  'src/frontend/pages/investor/ShareInformation/ShareInformation.jsx',
  'src/frontend/pages/investor/FinancialHighlights/FinancialHighlights.jsx',
  'src/frontend/pages/investor/Downloads/Downloads.jsx',
  'src/frontend/pages/investor/CorporateGovernance/CorporateGovernance.jsx',
  'src/frontend/pages/investor/AnnualReports/AnnualReports.jsx',
  'src/frontend/pages/ebidding/VendorRegistration/VendorRegistration.jsx',
  'src/frontend/pages/ebidding/TenderNotices/TenderNotices.jsx',
  'src/frontend/pages/ebidding/TenderDocuments/TenderDocuments.jsx',
  'src/frontend/pages/ebidding/AwardNotices/AwardNotices.jsx',
  'src/frontend/pages/ebidding/ActiveTenders/ActiveTenders.jsx',
  'src/frontend/pages/news/NewsDetails/NewsDetails.jsx',
  'src/frontend/pages/news/Events/Events.jsx',
  'src/frontend/pages/news/LatestNews/LatestNews.jsx',
  'src/frontend/pages/careers/InternshipProgram/InternshipProgram.jsx',
  'src/frontend/pages/careers/CurrentOpenings/CurrentOpenings.jsx',
  'src/frontend/pages/careers/ApplyNow/ApplyNow.jsx',
  'src/frontend/pages/Projects/ProjectDetails/ProjectDetails.jsx',
  'src/frontend/pages/Projects/UpcomingProjects/UpcomingProjects.jsx',
  'src/frontend/pages/Projects/OngoingProjects/OngoingProjects.jsx',
  'src/frontend/pages/Projects/CompletedProjects/CompletedProjects.jsx',
  'src/frontend/pages/About/LeadershipTeam/LeadershipTeam.jsx',
  'src/frontend/pages/About/BoardOfDirectors/BoardOfDirectors.jsx',
  'src/app/dashboard/about/leadership-team/edit/[id]/page.jsx',
  'src/app/dashboard/about/board-directors/edit/[id]/page.jsx',
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/http:\/\/localhost:3000\/api/g, '/api');
    content = content.replace(/http:\/\/localhost:3000/g, '');
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${file}`);
  } else {
    console.log(`Not found: ${file}`);
  }
});

console.log('API URL fix complete!');
