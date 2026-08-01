/*
  Warnings:

  - You are about to drop the `ProjectSpecification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectTimeline` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specifications` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeline` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectSpecification" DROP CONSTRAINT "ProjectSpecification_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTimeline" DROP CONSTRAINT "ProjectTimeline_projectId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "specifications" JSONB NOT NULL,
ADD COLUMN     "timeline" JSONB NOT NULL;

-- DropTable
DROP TABLE "ProjectSpecification";

-- DropTable
DROP TABLE "ProjectTimeline";

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
