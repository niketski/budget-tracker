'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from '@/components/ui/field';
import { Button } from "@/components/ui/button";
import { useActionState } from 'react';
import { userLogin, loginWithGoogle } from "@/lib/actions/auth";
import { Spinner } from "@/components/ui/spinner";
import Google from "@/components/icons/google";

const LoginForm = () => {
    const [state, formAction, isPending] = useActionState(userLogin, {
        values: {
            email: '',
            password: ''
        },
        errors: {},
        message: '',
        success: null
    });
    
    console.log('client: form state', state);

    return ( 
        <Card>
            <CardContent className="flex flex-col gap-y-3">
                <form action={formAction} className="flex flex-col gap-y-3">

                    {(state.success !== null || state.success && false) && (<div className="bg-red-100 p-2.5 rounded-lg">
                        <p className="text-red-500">{state.message}</p>
                    </div>)}

                    <Field className="mb-4" data-invalid={!!state.errors.email}>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input 
                            aria-invalid={!!state.errors.email}
                            placeholder="Enter your email" 
                            id="email" 
                            type="email" 
                            name="email"
                            defaultValue={state.values.email}/>
                        {state.errors.email && <p className="text-red-500">{state.errors.email}</p>}
                    </Field>
                    <Field data-invalid={!!state.errors.password}>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input 
                            aria-invalid={!!state.errors.password}
                            placeholder="Enter your password" 
                            id="password"
                            name="password" 
                            type="password" 
                            defaultValue={state.values.password}/>
                        {state.errors.password && <p className="text-red-500">{state.errors.password}</p>}
                    </Field>
                    <Field>
                        <Button type="submit">
                            { isPending ? <><Spinner/> Loading</>  : 'Submit' }
                        </Button>
                    </Field>
                </form>

                <p className="text-center my-5">Or</p>

                <div>
                    <form action={loginWithGoogle}>
                        <Button type="submit" variant="outline" className="w-full py-3 px-3">
                            <Google/>
                            Login with Google
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}
 
export default LoginForm;