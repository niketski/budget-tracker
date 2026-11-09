'use server'

import { AddIncomeSubmit } from "@/lib/types"
import { addIncomeSchema } from "../validators";
import { PrismaClient } from "../generated/prisma/client";

export async function addIncome(prevState: AddIncomeSubmit, formData: FormData): Promise<AddIncomeSubmit> {


    try {

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
        
        } else {

            console.log('success');

            

        }

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

            return {
                ...errorResponse,
                message: error.message
            }
        }

        return errorResponse;

    }

}