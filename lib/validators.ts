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