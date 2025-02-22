"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentSchema } from "@/utils/formSchema";
import { useToast } from "@/components/ui/use-toast";
import { fetchClasses, registerStudent } from "@/utils/fetchStudent";
import {
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";

import { useRouter } from "next/navigation";
import CustomFormField from "@/app/components/form/CustomFormField";
import CustomFileField from "@/app/components/form/CustomFileField";
import { Klasses } from "@/lib/TypeOF";
import CustomSelector from "@/app/components/form/CustomSelector";


const formFields = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Email",
  },
  {
    name: "first_name",
    label: "First Name",
    placeholder: "Enter First Name",
  },
  {
    name: "last_name",
    label: "Last Name",
    placeholder: "Enter Last Name",
  },
  {
    name: "mobile",
    label: "Mobile",
    placeholder: "Enter Mobile",
  },
  {
    name: "mothers_name",
    label: "Mother's Name",
    placeholder: "Enter Mother's Name",
  },
  {
    name: "fathers_name",
    label: "Father's Name",
    placeholder: "Enter Father's Name",
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Enter Address",
  },
  {
    name: "birth_date",
    label: "Birth Date",
    placeholder: "Enter Birth Date",
  },
  {
    name: "birth_certificate_no",
    label: "Birth Certificate No",
    placeholder: "Enter Birth Certificate No",
  },
  {
    name: "nid_no",
    label: "NID No",
    placeholder: "Enter NID No",
  },
];  
export default function Page() {
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState<Klasses[] | null>(null);
  const { toast } = useToast();

  const dataList = classes ? classes.map(klass => ({
    key: klass.id,
    value: klass.id.toString(),
    title: klass.full_klass,
    admission_open: klass.admission_open,
  })): [];
  
  const router = useRouter();
  const loadClasses = async () => {
    try {
      const response = await fetchClasses();
      if(response.success){

        setClasses(response.success);
      }else if(response.error){
        setClasses(null);
        toast({
          variant: "destructive",
          title: "Error",
          description: response.error,
        });
      }
      else{
        setClasses(null);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to load classes.",
      });
      setClasses(null);
    }
  };

  useEffect(() => {
    

    loadClasses();
  }, []);
  const defaultData = {
    student_id: "",
    position: 1,
    klass: "",
    first_name: "",
    last_name: "",
    mobile: "",
    mothers_name: "",
    fathers_name: "",
    address: "",
    birth_date: "",
    birth_certificate_no: "",
    nid_no: "",
    image: null,
  }
  const form = useForm<z.infer<typeof StudentSchema>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: defaultData
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);


  const handleSubmit = async (values: z.infer<typeof StudentSchema>) => {
    setLoading(true);
    const formData = new FormData();

    if (selectedImage) {
      formData.append("image", selectedImage);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload an image!",
      });
      setLoading(false);
      return;
    }


    Object.entries(values).forEach(([key, value]) => {
      if (key !== "image") formData.append(key, value as string);
    });
    


    try {
      const data = await registerStudent(formData);
      if (data.success) {
        toast({
          variant: "default",
          title: "Success!",
          description: "Student registered successfully",
        });
        form.reset(defaultData);
        setSelectedImage(null);
        router.push(`/students/${data.success.id}/additional-info`)
      }else if(data.error){
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-120 items-center border border-indigo-500 bg-slate-50 rounded-sm shadow-xl mx-auto p-4">
        <h3 className="text-3xl text-indigo-600 text-center my-3 font-bold">
          Register Student
        </h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 space-x-4">
              <div>
                {/* Form fields */}
                {formFields.map((field) => (
                  <CustomFormField key={field.name} control={form.control} label={field.label} name={field.name} />
                
                ))}
                
              </div>

              <div>
                {/* Class field */}
                <CustomSelector control={form.control} label="Select Class" dataList={dataList.filter(item => item.admission_open)} placeHolder="Select a Class" />
             
                {/* Image field */}
               <CustomFileField label="Image" fileStateFn={setSelectedImage} />
                <Button className="mt-2" type="submit">
                  {loading ? "Loading" : "Submit"}
                </Button>
              </div>

            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
