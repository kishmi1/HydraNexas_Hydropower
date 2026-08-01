-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "progress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectSpecification" (
    "id" SERIAL NOT NULL,
    "developer" TEXT NOT NULL,
    "river" TEXT NOT NULL,
    "projectType" TEXT NOT NULL,
    "annualEnergy" TEXT NOT NULL,
    "investment" TEXT NOT NULL,
    "constructionPeriod" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "ProjectSpecification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTimeline" (
    "id" SERIAL NOT NULL,
    "year" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "ProjectTimeline_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectSpecification_projectId_key" ON "ProjectSpecification"("projectId");

-- AddForeignKey
ALTER TABLE "ProjectSpecification" ADD CONSTRAINT "ProjectSpecification_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTimeline" ADD CONSTRAINT "ProjectTimeline_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
