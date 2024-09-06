/*
  Warnings:

  - A unique constraint covering the columns `[section]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tenant_section_key" ON "Tenant"("section");
