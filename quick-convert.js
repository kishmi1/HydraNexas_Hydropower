const fs = require('fs');
const path = require('path');

const conversions = [
  { file: 'src/app/dashboard/users/page.jsx', model: 'user', api: '/api/users', varName: 'users' },
  { file: 'src/app/dashboard/settings/page.jsx', model: 'setting', api: '/api/settings', varName: 'settings' },
  { file: 'src/app/dashboard/investor/share-information/page.jsx', model: 'shareInformation', api: '/api/share-information', varName: 'shareInformation' },
  { file: 'src/app/dashboard/investor/governance/page.jsx', model: 'governance', api: '/api/governance', varName: 'governance' },
  { file: 'src/app/dashboard/investor/financial-ratios/page.jsx', model: 'financialRatio', api: '/api/financial-ratios', varName: 'financialRatios' },
  { file: 'src/app/dashboard/investor/downloads/page.jsx', model: 'download', api: '/api/downloads', varName: 'downloads' },
  { file: 'src/app/dashboard/investor/dividend-history/page.jsx', model: 'dividendHistory', api: '/api/dividend-history', varName: 'dividendHistory' },
  { file: 'src/app/dashboard/investor/annual-reports/page.jsx', model: 'annualReport', api: '/api/annual-reports', varName: 'annualReports' },
  { file: 'src/app/dashboard/gallery/page.jsx', model: 'mediaGallery', api: '/api/media-gallery', varName: 'mediaGallery' },
  { file: 'src/app/dashboard/events/page.jsx', model: 'event', api: '/api/events', varName: 'events' },
  { file: 'src/app/dashboard/ebidding/vendor-registrations/page.jsx', model: 'vendorRegistration', api: '/api/vendor-registrations', varName: 'vendorRegistrations' },
  { file: 'src/app/dashboard/ebidding/tender-notices/page.jsx', model: 'tenderNotice', api: '/api/tender-notices', varName: 'tenderNotices' },
  { file: 'src/app/dashboard/ebidding/tender-documents/page.jsx', model: 'tenderDocument', api: '/api/tender-documents', varName: 'tenderDocuments' },
  { file: 'src/app/dashboard/ebidding/award-notices/page.jsx', model: 'awardNotice', api: '/api/award-notices', varName: 'awardNotices' },
  { file: 'src/app/dashboard/ebidding/active-tenders/page.jsx', model: 'activeTender', api: '/api/active-tenders', varName: 'activeTenders' },
  { file: 'src/app/dashboard/contact/page.jsx', model: 'contact', api: '/api/contact', varName: 'contacts' },
  { file: 'src/app/dashboard/careers/job-openings/page.jsx', model: 'jobOpening', api: '/api/job-openings', varName: 'jobOpenings' },
  { file: 'src/app/dashboard/careers/job-applications/page.jsx', model: 'jobApplication', api: '/api/job-applications', varName: 'jobApplications' },
];

conversions.forEach(({ file, model, api, varName }) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('"use client"') || content.includes("'use client'")) {
      console.log(`⏭️  ${file}: Already client`);
      return;
    }
    
    if (!content.includes('prisma.')) {
      console.log(`⏭️  ${file}: No prisma`);
      return;
    }
    
    content = '"use client";\n\nimport { useEffect, useState } from "react";\n\n' + content;
    content = content.replace(/import \{ prisma \} from "@\/lib\/prisma";\n?/, '');
    content = content.replace(/export default async function (\w+)\(\)/, 'export default function $1()');
    
    const stateCode = `    const [${varName}, set${varName.charAt(0).toUpperCase() + varName.slice(1)}] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("${api}")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    set${varName.charAt(0).toUpperCase() + varName.slice(1)}(data.${model}s || data.${model} || []);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

`;
    
    content = content.replace(/const \w+ = await prisma\.\w+\.findMany\([^)]+\);/g, stateCode);
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file}`);
  }
});

console.log('\n✅ Conversion complete');
