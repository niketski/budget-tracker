'use server'

import { LoginFormState, SignupFormState } from "@/types/index";
import { loginSchema, signupSchema } from "@/lib/validators";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { isRedirectError } from "next/dist/client/components/redirect-error";
import prisma from '@/prisma/db';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import { Prisma } from '@/lib/generated/prisma/client';

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


export async function userSignup(prevState: SignupFormState, formData: FormData): Promise<SignupFormState> {

    try {

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const formValues = signupSchema.safeParse({
            name,
            email,
            password
        });

        if(!formValues.success) {

            const errors = formValues.error.flatten().fieldErrors;

            console.log('server: field errors', errors);
            
            return {
                values: {
                    name,
                    email,
                    password
                },
                errors,
                message: 'Please provide the correct information.',
                success: false,
            }
        }

        // generate hash password
        const salt = genSaltSync(10);
        const hashedPassword = hashSync(password, salt);

        // create user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        console.log('server: new user created', newUser);
        

        return {
            values: {
                name: '',
                email: '',
                password: ''
            },
            errors: {},
            message: 'You have successfully signed up! Please login to continue.',
            success: true,
        }
        

    } catch(error: unknown) {

        console.log('server error:', error);

        if(isRedirectError(error)) {

            throw error;
        }

        if(
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002'
        ) {

            return {
                values: {
                    name: '',
                    email: '',
                    password: '',
                },
                errors: {},
                message: 'Email already exists. Please use a different email.',
                success: false,
            };

        }

        return {
            values: {
                name: '',
                email: '',
                password: '',
            },
            errors: {},
            message: 'An error occurred while logging in.',
            success: false,
        };
    }
}