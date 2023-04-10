/*
  Warnings:

  - The values [LEARNER,WRITER,EDITOR] on the enum `RoleCode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleCode_new" AS ENUM ('RECIPIENT', 'DRIVER', 'DONOR', 'ADMIN');
ALTER TABLE "Role" ALTER COLUMN "code" TYPE "RoleCode_new" USING ("code"::text::"RoleCode_new");
ALTER TYPE "RoleCode" RENAME TO "RoleCode_old";
ALTER TYPE "RoleCode_new" RENAME TO "RoleCode";
DROP TYPE "RoleCode_old";
COMMIT;
