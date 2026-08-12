'use client';

import { Card, CardContent, CardHeader} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from '@/components/ui/field';
import { Button } from "@/components/ui/button";
import { useActionState } from 'react';
import { userSignup } from '@/lib/actions/auth';
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

const SignUpForm = () => {
    const [state, formAction, isPending] = useActionState(userSignup, {
        values: {
            name: '',
            email: '',
            password: '',
        },
        errors: {},
        message: '',
        success: null
    });

    console.log('client form state: ', state);

    return ( 
        <Card>
            <CardHeader className="text-center">
                <p>Sign up to start managing your budget.</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-3">
                <form action={formAction}>

                    {(state.success !== null && state.success === false) && (<div className="bg-red-100 p-2.5 rounded-lg mb-4">
                        <p className="text-red-500">{state.message}</p>
                    </div>)}

                    <Field className="mb-4" data-invalid={!!state.errors.name}>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input 
                            aria-invalid={!!state.errors.name}
                            defaultValue={state.values.name}
                            id="name" 
                            name="name" 
                            placeholder="Enter your name" 
                            type="text"/>

                            {state.errors.name && <p className="text-red-500">{state.errors.name}</p>}
                    </Field>
                    <Field className="mb-4" data-invalid={!!state.errors.email}>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input 
                            aria-invalid={!!state.errors.email}
                            defaultValue={state.values.email}
                            id="email" 
                            name="email" 
                            placeholder="Enter your email" 
                            type="email"/>

                            {state.errors.email && <p className="text-red-500">{state.errors.email}</p>}
                    </Field>
                    <Field className="mb-4" data-invalid={!!state.errors.password}>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input 
                            aria-invalid={!!state.errors.password}
                            defaultValue={state.values.password}
                            id="password" 
                            name="password" 
                            placeholder="Enter your password" 
                            type="password"/>

                            {state.errors.password && <p className="text-red-500">{state.errors.password[0]}</p>}
                    </Field>
                    <Field>
                        <Button type="submit">
                            { isPending ? <><Spinner/> Loding</>  : 'Submit' }
                        </Button>
                    </Field>

                    { state.success && (<div className="p-2.5 bg-green-100 border border-green-600 text-green-600 rounded-lg mt-4">
                        {state.message} <Link href="/login" className="underline">Go to Login page.</Link>
                    </div>)}
                </form>
            </CardContent>
        </Card>
    );
}
 
export default SignUpForm;