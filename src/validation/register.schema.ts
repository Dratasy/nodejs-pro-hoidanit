import { isEmailExist } from "services/client/auth.service";
import * as z from "zod";


const passwordSchema = z
    .string()
    .min(3, { message: "Password must be at least 3 characters" })
    .max(20, { message: "Password must be at most 20 characters" })
// .refine((password) => /[A-Z]/.test(password), {
//     message: uppercaseErrorMessage,
// })
// .refine((password) => /[a-z]/.test(password), {
//     message: lowercaseErrorMessage,
// })
// .refine((password) => /[0-9]/.test(password), { message: numberErrorMessage })
// .refine((password) => /[!@#$%^&*]/.test(password), {
//     message: specialCharacterErrorMessage,
// });

const emailSchema =
    z.string().email("Email khong dung dinh dang")
        .refine(async (email) => {
            const existingUser = await isEmailExist(email);
            return !existingUser;
        }, {
            message: "Email already exists",
            path: ["email"]

        });

const RegisterSchema = z.object({
    fullName: z.string().trim().min(1, { message: "Ten khong dc de trong" }),
    username: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type TRegisterSchema = z.infer<typeof RegisterSchema>;

export {
    RegisterSchema, TRegisterSchema
}