-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "FederatedCredentials" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    CONSTRAINT "FederatedCredentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "sid" TEXT NOT NULL PRIMARY KEY,
    "expires" TEXT NOT NULL,
    "payload" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FederatedCredentials_externalId_key" ON "FederatedCredentials"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "FederatedCredentials_provider_externalId_key" ON "FederatedCredentials"("provider", "externalId");
