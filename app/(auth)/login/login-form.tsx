import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from '@/components/ui/field';
import { Button } from "@/components/ui/button";

const LoginForm = () => {
    return ( 
        <Card>
            <CardContent className="flex flex-col gap-y-3">
                <Field className="mb-4">
                    <FieldLabel>Email</FieldLabel>
                    <Input placeholder="Enter your email" type="email"/>
                </Field>
                <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input placeholder="Enter your password" type="password"/>
                </Field>
                <Field>
                    <Button>Submit</Button>
                </Field>
            </CardContent>
        </Card>
    );
}
 
export default LoginForm;