import { PrismaClient } from '@prisma/client';
import { product } from '../database';

const seedDatabase = async (prisma: PrismaClient) => {
    const parsedData: any[] = product.map((item: any) => {
        for (const key of Object.keys(item)) {
            if (['createdAt', 'updatedAt'].includes(key)) {
                item[key] = new Date(item[key]);
            }
        }
        return item;
    });

    await prisma.product.createMany({ data: parsedData });
    console.log(`Seed Product data has been added to database`);
};

export default seedDatabase;
