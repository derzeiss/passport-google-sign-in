import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../.env') });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tables = ['User', 'FederatedCredentials'];

tables.forEach(async (table) => {
  await prisma.$executeRawUnsafe(`DELETE FROM "${table}"`);
});
