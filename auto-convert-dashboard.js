const fs = require('fs');
const path = require('path');

const filesToConvert = [
  { file: 'src/app/dashboard/users/page.jsx', model: 'user', apiPath: '/api/users' },
  { file: 'src/app/dashboard/settings/page.jsx', model: 'setting', apiPath: '/api/settings' },
  { file: 'src/app/dashboard/projects/page.jsx', model: 'project', apiPath: '/api/projects' },
  { file: 'src/app/dashboard/news/page.jsx', model: 'news', apiPath: '/api/news' },
  { file: 'src/app/dashboard/investor/share-information/page.jsx', model: 'shareInformation', apiPath: '/api/share-information' },
  { file: 'src/app/dashboard/investor/governance/page.jsx', model: 'governance', apiPath: '/api/governance' },
  { file: 'src/app/dashboard/investor/financial-ratios/page.jsx', model: 'financialRatio', apiPath: '/api/financial-ratios' },
  { file: 'src/app/dashboard/investor/downloads/page.jsx', model: 'download', apiPath: '/api/downloads' },
  { file: 'src/app/dashboard/investor/dividend-history/page.jsx', model: 'dividendHistory', apiPath: '/api/dividend-history' },
  { file: 'src/app/dashboard/investor/annual-reports/page.jsx', model: 'annualReport', apiPath: '/api/annual-reports' },
  { file: 'src/app/dashboard/gallery/page.jsx', model: 'mediaGallery', apiPath: '/api/media-gallery' },
  { file: 'src/app/dashboard/events/page.jsx', model: 'event', apiPath: '/api/events' },
  { file: 'src/app/dashboard/ebidding/vendor-registrations/page.jsx', model: 'vendorRegistration', apiPath: '/api/vendor-registrations' },
  { file: 'src/app/dashboard/ebidding/tender-notices/page.jsx', model: 'tenderNotice', apiPath: '/api/tender-notices' },
  { file: 'src/app/dashboard/ebidding/tender-documents/page.jsx', model: 'tenderDocument', apiPath: '/api/tender-documents' },
  { file: 'src/app/dashboard/ebidding/award-notices/page.jsx', model: 'awardNotice', apiPath: '/api/award-notices' },
  { file: 'src/app/dashboard/ebidding/active-tenders/page.jsx', model: 'activeTender', apiPath: '/api/active-tenders' },
  { file: 'src/app/dashboard/contact/page.jsx', model: 'contact', apiPath: '/api/contact' },
  { file: 'src/app/dashboard/careers/job-openings/page.jsx', model: 'jobOpening', apiPath: '/api/job-openings' },
  { file: 'src/app/dashboard/careers/job-applications/page.jsx', model: 'jobApplication', apiPath: '/api/job-applications' },
];

let convertedCount = 0;
let skippedCount = 0;

filesToConvert.forEach(({ file, model, apiPath }) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already has "use client"
    if (content.includes('"use client"') || content.includes("'use client'")) {
      console.log(`⏭️  ${file}: Already has "use client" - skipping`);
      skippedCount++;
      return;
    }
    
    // Check if it has the pattern we want to convert
    if (!content.includes('prisma.' + model) && !content.includes('prisma.' + model + 's')) {
      console.log(`⏭️  ${file}: No matching Prisma pattern - skipping`);
      skippedCount++;
      return;
    }
    
    // Convert the pattern
    const prismaPattern = new RegExp(`const \\w+ = await prisma\\.${model}(s)?\\.findMany\\([^)]+\\);`, 'g');
    const variableMatch = content.match(/const (\w+) = await prisma/);
    const variableName = variableMatch ? variableMatch[1] : 'data';
    
    // Add "use client" and imports
    content = '"use client";\n\nimport { useEffect, useState } from "react";\n\n' + content;
    
    // Remove prisma import
    content = content.replace(/import \{ prisma \} from "@\/lib\/prisma";\n?/, '');
    
    // Convert async function to regular function
    content = content.replace(/export default async function (\w+)\(\)/, 'export default function $1()');
    
    // Add state and useEffect
    const useStateCode = `    const [${variableName}, set${variableName.charAt(0).toUpperCase() + variableName.slice(1)}] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("${apiPath}")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    set${variableName.charAt(0).toUpperCase() + variableName.slice(1)}(data.${model}s || data.${model} || []);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching ${model}:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

`;
    
    // Replace the prisma call with the useState code
    content = content.replace(prismaPattern, useStateCode);
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ ${file}: Converted to client component`);
    convertedCount++;
  } else {
    console.log(`❌ Not found: ${file}`);
  }
});

console.log(`\n📊 Summary:`);
console.log(`✅ Converted: ${convertedCount}`);
console.log(`⏭️  Skipped: ${skippedCount}`);
console.log(`📝 Total: ${filesToConvert.length}`);
