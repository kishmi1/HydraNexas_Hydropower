const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("HydraNexa@2026", 10);

    const admin = await prisma.admin.upsert({
        where: {
            email: "admin@hydranexa.com",
        },
        update: {},
        create: {
            name: "HydraNexa Super Admin",
            email: "admin@hydranexa.com",
            password: hashedPassword,
            role: "SUPER_ADMIN",
            isActive: true,
        },
    });

    console.log("✅ Super Admin Created");
    console.log(admin);
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
