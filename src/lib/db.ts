import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
prisma.$executeRaw`SET timezone = 'UTC+7'`;

export default prisma;
