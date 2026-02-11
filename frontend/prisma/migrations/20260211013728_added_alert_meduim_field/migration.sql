/*
  Warnings:

  - Added the required column `alert_medium` to the `Alert` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AlertMedium" AS ENUM ('TELEGRAM', 'EMAIL');

-- AlterTable
ALTER TABLE "Alert" ADD COLUMN     "alert_medium" "AlertMedium" NOT NULL;
