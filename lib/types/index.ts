import { addIncomeSchema } from "../validators";
import z from 'zod';

export interface FormSubmition {
    errors: {
        [name: string]: string[] | undefined    
    }
    success: boolean | null 
    message: string;
    idle: boolean
}

export interface AddIncomeSubmit extends FormSubmition {
    values: z.infer<typeof addIncomeSchema>
}