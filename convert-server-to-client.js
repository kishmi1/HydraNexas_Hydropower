const fs = require('fs');
const path = require('path');

const serverComponentFiles = [
  'src/app/dashboard/users/page.jsx',
  'src/app/dashboard/users/edit/[id]/page.jsx',
  'src/app/dashboard/settings/page.jsx',
  'src/app/dashboard/projects/page.jsx',
  'src/app/dashboard/projects/edit/[id]/page.jsx',
  'src/app/dashboard/news/page.jsx',
  'src/app/dashboard/news/edit/[id]/page.jsx',
  'src/app/dashboard/investor/share-information/page.jsx',
  'src/app/dashboard/investor/share-information/edit/[id]/page.jsx',
  'src/app/dashboard/investor/governance/page.jsx',
  'src/app/dashboard/investor/governance/edit/[id]/page.jsx',
  'src/app/dashboard/investor/financial-ratios/page.jsx',
  'src/app/dashboard/investor/financial-ratios/edit/[id]/page.jsx',
  'src/app/dashboard/investor/financial-highlights/edit/[id]/page.jsx',
  'src/app/dashboard/investor/downloads/page.jsx',
  'src/app/dashboard/investor/downloads/edit/[id]/page.jsx',
  'src/app/dashboard/investor/dividend-history/page.jsx',
  'src/app/dashboard/investor/dividend-history/edit/[id]/page.jsx',
  'src/app/dashboard/investor/annual-reports/page.jsx',
  'src/app/dashboard/investor/annual-reports/edit/[id]/page.jsx',
  'src/app/dashboard/gallery/page.jsx',
  'src/app/dashboard/gallery/edit/[id]/page.jsx',
  'src/app/dashboard/events/page.jsx',
  'src/app/dashboard/events/edit/[id]/page.jsx',
  'src/app/dashboard/ebidding/vendor-registrations/view/[id]/page.jsx',
  'src/app/dashboard/ebidding/vendor-registrations/page.jsx',
  'src/app/dashboard/ebidding/tender-notices/page.jsx',
  'src/app/dashboard/ebidding/tender-notices/edit/[id]/page.jsx',
  'src/app/dashboard/ebidding/tender-documents/page.jsx',
  'src/app/dashboard/ebidding/tender-documents/edit/[id]/page.jsx',
  'src/app/dashboard/ebidding/award-notices/page.jsx',
  'src/app/dashboard/ebidding/award-notices/edit/[id]/page.jsx',
  'src/app/dashboard/ebidding/active-tenders/page.jsx',
  'src/app/dashboard/ebidding/active-tenders/edit/[id]/page.jsx',
  'src/app/dashboard/contact/[id]/page.jsx',
  'src/app/dashboard/contact/page.jsx',
  'src/app/dashboard/careers/job-openings/page.jsx',
  'src/app/dashboard/careers/job-openings/edit/[id]/page.jsx',
  'src/app/dashboard/careers/job-applications/page.jsx',
  'src/app/dashboard/careers/internships/edit/[id]/page.jsx',
];

let convertedCount = 0;
let alreadyClientCount = 0;
let notFoundCount = 0;

serverComponentFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already has "use client"
    if (content.includes('"use client"') || content.includes("'use client'")) {
      console.log(`ℹ️  ${file}: Already has "use client"`);
      alreadyClientCount++;
      return;
    }
    
    // Add "use client" at the beginning
    content = '"use client";\n\n' + content;
    fs.writeFileSync(filePath, content);
    console.log(`✅ ${file}: Added "use client"`);
    convertedCount++;
  } else {
    console.log(`❌ Not found: ${file}`);
    notFoundCount++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`✅ Converted: ${convertedCount}`);
console.log(`ℹ️  Already client: ${alreadyClientCount}`);
console.log(`❌ Not found: ${notFoundCount}`);
console.log(`📝 Total: ${serverComponentFiles.length}`);
