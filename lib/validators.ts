import z from "zod";

export const loginSchema = z.object({
    email: z.email({ message: "Invalid email address." }),
    password: z.string().min(1, { message: "Password is required." })
});

export const signupSchema = z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    email: z.email({ message: 'Invalid email address.' }),
    password: z.string()
        .min(6, { message: 'Password must be atleast 6 character\'s long.' })
        .regex(/[A-Z]/, { message: 'Password must contain an uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain a lowercase letter' })
        .regex(/[0-9]/, "Password must contain a number")
        .regex(/[^A-Za-z0-9]/, "Password must contain a special character")
});

export const addIncomeSchema = z.object({
    name: z.string().min(1, 'Name is required.'),
    amount: z.string().min(1, 'Amount is required.')
        .refine(val => {
            const num = parseFloat(val);

            return num > 50;
            
        }, 'Amount must be at least 50.'),
    date: z.iso.date('Please enter a valid date.'),
});