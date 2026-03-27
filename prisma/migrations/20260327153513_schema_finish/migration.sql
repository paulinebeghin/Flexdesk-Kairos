/*
  Warnings:

  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('VISITEUR', 'MEMBRE', 'ADMIN');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBRE';
