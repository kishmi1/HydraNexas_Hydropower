const fs = require('fs');
const path = require('path');

// These are the critical files that have build-time database calls
const criticalFiles = [
  'src/app/dashboard/users/page.jsx',
  'src/app/dashboard/settings/page.jsx',
  'src/app/dashboard/projects/page.jsx',
  'src/app/dashboard/news/page.jsx',
  'src/app/dashboard/investor/share-information/page.jsx',
  'src/app/dashboard/investor/governance/page.jsx',
  'src/app/dashboard/investor/financial-ratios/page.jsx',
  'src/app/dashboard/investor/downloads/page.jsx',
  'src/app/dashboard/investor/dividend-history/page.jsx',
  'src/app/dashboard/investor/annual-reports/page.jsx',
  'src/app/dashboard/gallery/page.jsx',
  'src/app/dashboard/events/page.jsx',
  'src/app/dashboard/ebidding/vendor-registrations/page.jsx',
  'src/app/dashboard/ebidding/tender-notices/page.jsx',
  'src/app/dashboard/ebidding/tender-documents/page.jsx',
  'src/app/dashboard/ebidding/award-notices/page.jsx',
  'src/app/dashboard/ebidding/active-tenders/page.jsx',
  'src/app/dashboard/contact/page.jsx',
  'src/app/dashboard/careers/job-openings/page.jsx',
  'src/app/dashboard/careers/job-applications/page.jsx',
];

console.log('⚠️  CRITICAL: These files need manual conversion to client components with API calls');
console.log('They have build-time database calls that will fail in Vercel\n');

criticalFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it has prisma import
    if (content.includes('prisma')) {
      console.log(`❌ ${file}: Has Prisma calls - needs conversion`);
    } else {
      console.log(`✅ ${file}: No Prisma calls - should be fine`);
    }
  } else {
    console.log(`❌ Not found: ${file}`);
  }
});

console.log('\n📝 Recommended approach:');
console.log('1. Keep server components for simple pages without database calls');
console.log('2. Convert pages with database calls to client components with API fetch');
console.log('3. Ensure all API routes are properly created');
