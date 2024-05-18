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

export const signupFormSchema = z.object({
  
  user_type: z
  .enum(['student' , 'teacher', 'administrator'])
  ,
  username: z
      .string()
      .min(5, {
        message: "Username must be at least 5 characters.",
      })
      .max(50),
  first_name: z
      .string()
      .min(2, {
        message: "First Name must be at least 2 characters.",
      })
      .max(50),
  last_name: z
      .string()
      .min(2, {
        message: "Last Name must be at least 2 characters.",
      })
      .max(50),
  email: z
      .string()
      .min(2, {
        message: "Email must be at least 2 characters.",
      })
      .email("This is not a valid Email")
      .max(50),
      password: z
      .string()
      .min(6, {
        message: "Password at least 6 characters"
      }),
      confirmPassword: z
      .string()
      ,
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});