import {z} from 'zod'


export const loginFormSchema = z.object({
    instu_id: z.string(),
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


export const StudentSchema = z.object({
  id: z.number().optional(),
  student_id: z.string().min(1, "Student ID is required"),
  position: z.number().int(),
  klass: z.string().min(1, "Plese Select a Classes"),
  institute: z.string().optional(),
  first_name: z.string().min(1, "First Name is required"),
  last_name: z.string().min(1, "Last Name is required"),
  mobile: z.string().min(1, "Mobile number is required"),
  mothers_name: z.string().min(1, "Mother's Name is required"),
  fathers_name: z.string().min(1, "Father's Name is required"),
  address: z.string().min(1, "Address is required"),
  birth_date: z.string().min(1, "Birth Date is required"),
  birth_certificate_no: z.string().min(1, "Birth Certificate No is required"),
  nid_no: z.string().nullable(),
  image: z.any().nullable(),
});

export const AttendenceSchema = z.object({
  id: z.string().optional(),
  student: z.string().min(1),
  klass: z.string().min(1),
  presents: z.boolean(),
  cause: z.string().optional(),
})


