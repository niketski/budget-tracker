'use server'

import { AddIncomeSubmit } from "@/lib/types"
import { addIncomeSchema } from "../validators";
import prisma from '@/lib/db';
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function addIncome(prevState: AddIncomeSubmit, formData: FormData): Promise<AddIncomeSubmit> {

    const session = await auth();
    const userId = session?.user?.id;

    try {

        if(!userId) {

            throw new Error('User is not authenticated.');
            
        }
        
        const name = formData.get('name');
        const amount = formData.get('amount');
        const date = formData.get('date');

        console.log(name, amount, date);
        console.log(new Date(`${date}T00:00:00.000Z`));

        const incomeData = addIncomeSchema.safeParse({
            name,
            amount: formData.get('amount'),
            date: date
        });

        if(!incomeData.success) {

            const errors = incomeData.error.flatten().fieldErrors;

            return {
                errors,
                message: "Please input the correct info.",
                success: false,
                idle: false,
                values: {
                  name: name as string,
                  amount: amount as string,
                  date: date as string  
                }
            }
        
        } 

        await prisma.income.create({
            data: {
                name: name as string,
                amount: Number(amount),
                date: new Date(date as string),
                user: {
                    connect: {
                        id: session?.user?.id as string
                    }
                }
            }
        });

        revalidatePath('/income');

        console.log(prevState);

        return {
            values: {
                name: '',
                amount: '',
                date: ''
            },
            success: true,
            idle: false,
            message: 'Income has been added successfully!',
            errors: {}
        }
        

    } catch (error: unknown) {

        const errorResponse = {
            values: {
                name: '',
                amount: '',
                date: '',
            },
            idle: false,
            message: 'Something went wrong.',
            success: false,
            errors: {}
        }

        if(error instanceof Error) {
            console.log(error.message);

            return {
                ...errorResponse,
                message: error.message
            }
        }

        return errorResponse;

    }

}

export async function getAllUserIncome(userId: string) {

    try {

        if(!userId) {
            
            throw new Error('User is not authenticated.');
        }

        const userIncome = await prisma.income.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return {
            data: userIncome,
            success: true,
            message: 'Income has been fetched successfully!'
        }

    } catch(error: unknown) {

        if(error instanceof Error) {

            return {
                success: false,
                message: error.message,
                data: null
            }
        }

        return {
            success: false,
            message: 'Something went wrong.',
            data: null
        }

    }
}
