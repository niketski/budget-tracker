import 'dotenv/config'
import { PrismaClient, Prisma } from "../lib/generated/prisma/client";
import { PrismaNeon } from '@prisma/adapter-neon';

const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL as string
});

const prisma = new PrismaClient({
    adapter
});

 const userData: Prisma.UserCreateInput[] = [
    {
        name: 'John Doe',
        email: 'john_doe@gmail.com',
        password: 'admin123'
    },
    {
        name: 'Jane Doe',
        email: 'jane_doe@gmail.com',
        password: 'admin123'
    }
 ];

 export async function main() {

    for(const u of userData) {
        await prisma.user.create({ data: u});
    }
 }

 main();