import {z} from 'zod'


export const loginFormSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(50),
      password: z
      .string()
      .min(6, {
        message: "Password at least 6 characters"
      })
  });