"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast";
import { createUserStudent } from "@/utils/fetchUser";
  
export default function UserCreation({
    
    username,
    student_id,
    children,
}:{
    
    username:string,
    student_id: string
    children:React.ReactNode,

}) {
  const {toast} = useToast();
  const handleUserCreation = async () => {
    // Create a user account for the student
    if (student_id) {
      try {
        const response = await createUserStudent(student_id);
        if (response) {
          toast({
            title: "User Account Created",
            description: "A user account has been created for the student",
            variant: "default"
          });
        }else{
          toast({
            title: "User Account Not Created",
            description: "An error occurred while creating a user account for the student",
            variant: "destructive"
          });
        }
      }catch(error:any){
        toast({
          title: "User Account Not Created",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  }


    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>User Account For Student</AlertDialogTitle>
            <AlertDialogDescription>
              A user account will be created for the student with the following credentials:
              <br />
              <span className=" text-xl text-violet-600" >Username: {username}</span>
              <br />
              <span className=" text-xl text-red-400">Password: {student_id}</span>
              <br />
              <span>An email may be sent to the corresponding student</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUserCreation} >Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  
}