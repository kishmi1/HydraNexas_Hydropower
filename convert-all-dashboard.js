const fs = require('fs');
const path = require('path');

const dashboardPages = [
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

let convertedCount = 0;
let skippedCount = 0;

dashboardPages.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already has "use client"
    if (content.includes('"use client"') || content.includes("'use client'")) {
      console.log(`⏭️  ${file}: Already has "use client" - skipping`);
      skippedCount++;
      return;
    }
    
    // Check if it has prisma calls
    if (!content.includes('prisma.')) {
      console.log(`⏭️  ${file}: No Prisma calls - skipping`);
      skippedCount++;
      return;
    }
    
    // Get the variable name from the prisma call
    const prismaMatch = content.match(/const (\w+) = await prisma\.\w+\.findMany/);
    const variableName = prismaMatch ? prismaMatch[1] : 'data';
    
    // Get the model name from prisma call
    const modelMatch = content.match(/prisma\.(\w+)\.findMany/);
    const modelName = modelMatch ? modelMatch[1] : 'data';
    
    // Create API path from model name (convert camelCase to kebab-case)
    const apiPath = `/api/${modelName.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    
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
                    set${variableName.charAt(0).toUpperCase() + variableName.slice(1)}(data.${modelName}s || data.${modelName} || []);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching ${modelName}:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

`;
    
    // Replace the prisma call with the useState code
    const prismaPattern = /const \w+ = await prisma\.\w+\.findMany\([^)]+\);/g;
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
console.log(`📝 Total: ${dashboardPages.length}`);
