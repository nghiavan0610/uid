import { PrismaClient } from '@prisma/client';
import * as path from 'path';

const prisma = new PrismaClient();

const seedOrder = ['product'];

(async function seed() {
    try {
        const seedFilesPath = path.join(__dirname, 'seed');
        await prisma.$transaction(
            async (transaction) => {
                for (const model of seedOrder) {
                    const seedFilePath = path.join(seedFilesPath, `${model}.seed.ts`);

                    const { default: seedDatabase } = await import(seedFilePath);

                    await seedDatabase(transaction);
                }
            },
            {
                maxWait: 10000,
                timeout: 60000,
            },
        );

        console.log('[ADDED] All seed data has been added to database');
    } catch (err) {
        throw err;
    } finally {
        await prisma.$disconnect();
    }
})();
