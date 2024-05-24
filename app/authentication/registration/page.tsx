"use client";

import { z } from "zod";
import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, 
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { signupFormSchema } from "@/utils/formSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { registerUser } from "@/utils/fetchUser";
import AuthContext from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";


export default function page() {
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const {user} = useContext(AuthContext);
    const {toast} = useToast();
    const router = useRouter()

    

    useEffect(() => {
      if (user?.user_type === 'student' || user?.user_type == 'teacher'){
        console.log(user)
        toast({
          variant: "destructive",
          title: "Heads Up!",
          description: "You don't have permission to register a new user!"
        })
        return router.push("/")
      }
    }, [user])
  // Creating form resolver using zodResolver
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      password:"",
      confirmPassword: "",
      email: "",
      user_type: "student",
      first_name: "",
      last_name: "",

    },
  });

  // 2. Define a submit handler.
 async function onSubmit(data: z.infer<typeof signupFormSchema>) {
      setLoading(true);
    
      const registration = await registerUser(data)
    if (registration && registration.status === 201){
        setStatus("User Created Successfully");
        
        setLoading(false)
        return;
    }
    setLoading(false);
    setStatus(prev => registration)
    
   console.log("Submitted")
  }
  if(status && status.length > 0){
    return (
      <>
      <h1>{status}</h1>
      <Button className="text-center w-24 p-2 align-middle items-center" size='sm' onClick={() => setStatus("")}>
      Add another
      </Button>
      </>
    )
  }else{
    return (
      <>
      <h1>{status && "User Success"}</h1>
        
        <div className="w-96 items-center border border-indigo-500 bg-slate-50 rounded-sm shadow-xl mx-auto p-4" >
          <h3 className="text-3xl text-indigo-500 font-bold text-center mb-5" >Register User</h3>
  
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* User Type field */}
              <FormField
                  control={form.control}
                  name="user_type"
                  render={({ field }) => (
                  <FormItem className=" z-50" >
                      <FormLabel>User Type </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} >
                          <FormControl>
                              <SelectTrigger>
                                  <SelectValue placeholder="Select an user type" /> 
                              </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {(user?.user_type === "developer" || user?.user_type === "administrator") && (
                              <SelectItem value="administrator" >Administrator</SelectItem>
                            )}
                              
                              <SelectItem value="teacher" >Teacher</SelectItem>
                              <SelectItem value="student" >Student</SelectItem>
                              
                          </SelectContent>
                      </Select>
                      <FormMessage />
                  </FormItem>
                  )}
              />
            {/* UserName field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            {/* First Name field */}
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            {/* Last Name field */}
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
              {/* Email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          
          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          
  
  
            
          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({field}) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            >
  
            </FormField>
            <Button>{loading ? "Loading" : "Submit"}</Button>
          </form>
        </Form>
        </div>
      </>
    );
  }

}
