"use client";

import { z } from "zod";
import React, { useContext, useEffect } from "react";
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
import { loginFormSchema } from "@/utils/formSchema";
import AuthContext from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";


export default function page() {
  // Getting authentication context
  const {signIn, user, error} = useContext(AuthContext);
  // Checking the state of user 
  const router = useRouter();
  useEffect(() => {
    if(user){
      return router.push('/')
    }
  }, [user])
  
  // Creating form resolver using zodResolver
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password:"",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginFormSchema>) {
   
   signIn(values)
   console.log("Submitted", values)
  }
  return (
    <>
    {user? (<h1>{user.name}</h1>):(<h1>Shade</h1>)}
    {error?.length >0 && (<h1>{error}</h1>)}
      
      <div className="w-96 items-center border border-indigo-500 bg-slate-50 rounded-sm shadow-xl mx-auto p-4" >
        <h3 className="text-md" >Login</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* UserName field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
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
          >

          </FormField>
          <Button>Submit</Button>
        </form>
      </Form>
      </div>
    </>
  );
}
