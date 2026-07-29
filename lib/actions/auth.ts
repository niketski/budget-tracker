'use server'

import { LoginFormState } from "@/types/index";
import { loginSchema } from "@/lib/validators";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { isRedirectError } from "next/dist/client/components/redirect-error";

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

            console.log('server: field errors ', errors);
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

        await signIn('credentials', {
            email,
            password,
            redirectTo: '/'
        });

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

        if (isRedirectError(error)) {

            throw error;
        }

        const errorResponse = {
            values: {
                email: '',
                password: '',
            },
            errors: {},
            message: 'An error occurred while logging in.',
            success: false,
        };

        if(error instanceof AuthError) {

            switch(error.type) {
                case 'CredentialsSignin':

                    return {
                        ...errorResponse,
                        message: 'Invalid email or password.',
                    }

                default:
                    return {
                        ...errorResponse,
                        message: 'An error occurred while logging in.',
                    }
            }
           

        } 

        return errorResponse;
    }
}

export async function loginWithGoogle() {

    await signIn('google', {
        redirectTo: '/'
    });
    
}
