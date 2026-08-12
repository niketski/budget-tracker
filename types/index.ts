import z from "zod";
import { loginSchema, signupSchema } from "@/lib/validators";

// api response
export type APIResponse = {
    message: string,
    success: boolean | null,
};

// forms
export type ZodFieldErrors<T> = {
    [K in keyof T]?: string[] | undefined;
};

export type FormState<T> = {
    values: T,
    errors: ZodFieldErrors<T>,
};

export type LoginFormState = FormState<z.infer<typeof loginSchema>> & APIResponse;

export type SignupFormState = FormState<z.infer<typeof signupSchema>> & APIResponse;