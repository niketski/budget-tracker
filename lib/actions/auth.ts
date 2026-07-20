'use server'

import z from "zod";
import { LoginFormState } from "@/types/index";
import { loginSchema } from "@/lib/validators";

export async function userLogin(prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {

    try {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        
        const formValues = loginSchema.safeParse({
            email,
            password
        });

        // validate fields
        if(!formValues.success) {

            const errors = formValues.error.flatten().fieldErrors;
            const testErrors = z.treeifyError(formValues.error);

            console.log(testErrors);

            return {
                values: {
                    email,
                    password
                },
                errors,
                message: 'Please provide the correct information.',
                success: false,
            }
        }

        return {    
            values: {
                email: '',
                password: '',
            },
            errors: {},
            message: 'You have successfully Logged in.',
            success: true,
        }

    } catch(error: unknown) {

        const errorResponse = {
            values: {
                email: '',
                password: '',
            },
            errors: {},
            message: 'An error occurred while logging in.',
            success: false,
        };

        if(error instanceof Error) {

            return {
                ...errorResponse,
                message: error.message,
            }

        }

        return errorResponse;
    }
}
