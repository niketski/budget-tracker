'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from '@/components/ui/field';
import { Button } from "@/components/ui/button";
import { useActionState } from 'react';
import { userLogin } from "@/lib/actions/auth";
import { Spinner } from "@/components/ui/spinner";

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
    
    console.log(state);

    return ( 
        <Card>
            <CardContent className="flex flex-col gap-y-3">
                <form action={formAction} className="flex flex-col gap-y-3">
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
                            { isPending ? <><Spinner/> Loding</>  : 'Submit' }
                        </Button>
                    </Field>
                </form>
            </CardContent>
        </Card>
    );
}
 
export default LoginForm;