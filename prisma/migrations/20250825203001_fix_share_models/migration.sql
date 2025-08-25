/*
  Warnings:

  - You are about to drop the column `shareEnabled` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sharelink` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `content` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."ContentType" AS ENUM ('document', 'tweet', 'youtube', 'link');

-- DropForeignKey
ALTER TABLE "public"."content" DROP CONSTRAINT "content_userId_fkey";

-- DropIndex
DROP INDEX "public"."User_sharelink_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "shareEnabled",
DROP COLUMN "sharelink",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "public"."content";

-- CreateTable
CREATE TABLE "public"."Content" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "type" "public"."ContentType" NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tag" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Share" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Share_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ContentToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ContentToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Content_userId_idx" ON "public"."Content"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_title_key" ON "public"."Tag"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Share_hash_key" ON "public"."Share"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "Share_userId_key" ON "public"."Share"("userId");

-- CreateIndex
CREATE INDEX "_ContentToTag_B_index" ON "public"."_ContentToTag"("B");

-- AddForeignKey
ALTER TABLE "public"."Content" ADD CONSTRAINT "Content_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Share" ADD CONSTRAINT "Share_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ContentToTag" ADD CONSTRAINT "_ContentToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ContentToTag" ADD CONSTRAINT "_ContentToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
