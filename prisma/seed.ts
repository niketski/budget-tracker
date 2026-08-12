import { Prisma } from "../lib/generated/prisma/client";
import prisma from './db';

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