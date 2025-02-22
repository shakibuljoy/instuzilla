'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StudentSchema } from '@/utils/formSchema';
import { useToast } from '@/components/ui/use-toast';
import { fetchClasses, registerStudent } from '@/utils/fetchStudent';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Select, SelectGroup, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { studentInfo } from '@/lib/TypeOF';


interface Klasses {
  id: string;
  institute: string;
  name: string;
  group: string | null;
  branch: string | null;
  teachers: string[];
}

export default function StudentRegisterForm({ instance = null, instance_image = null }: { instance: studentInfo | null; instance_image: File | null }) {
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState<Klasses[] | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { toast } = useToast();

  const instanceData = instance && {
    student_id: instance.student_id,
    position: instance.position != null ? instance.position : 1,
    klass: instance.klass,
    institute: instance.institute,
    first_name: instance.first_name,
    last_name: instance.last_name,
    mobile: instance.mobile,
    mothers_name: instance.mothers_name,
    fathers_name: instance.fathers_name,
    address: instance.address,
    birth_date: instance.birth_date,
    birth_certificate_no: instance.birth_certificate_no,
    nid_no: instance.nid_no,
    image: null
  };

  const defaultValue = {
    student_id: "",
    position: 1,
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
  };

  const form = useForm<z.infer<typeof StudentSchema>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: defaultValue,
  });

  useEffect(() => {
    if (instance && instanceData) {
      form.reset(instanceData);
    }
  }, []);

  useEffect(() => {
    if (instance_image) {
      setSelectedImage(instance_image);
    }
    const getClasses = async () => {
      try {
        const response = await fetchClasses();
        if (response.success) {
          
          setClasses(response.success);
        }else{
          toast({
            variant: 'destructive',
            title: 'Error',
            description: response.error,
          });
          setClasses(null);
        }
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        });
        setClasses(null);
      }
    };
    getClasses();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (values: z.infer<typeof StudentSchema>) => {
    console.log("Form Submitted from Student Registration Form")
    setLoading(true);
    const formData = new FormData();

    if (selectedImage) {
      formData.append("image", selectedImage);
    } else if(!instance) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload an image!",
      });
      setLoading(false);
      return;
    }

    const safeValues = values as Record<string, any>;
    for (const key in safeValues) {
      if (key !== "image") {
        formData.append(key, safeValues[key]);
      }
    }
    try {
      const data = await registerStudent(formData,instance?.id);
      if (data) {
        toast({
          variant: "default",
          title: "Success!",
          description: instance ? "Student Edited successfully" : "Student registered successfully",
        });
        form.reset(defaultValue);
        setSelectedImage(null);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
      form.reset(defaultValue)
    }
  };

  return (
    <div className="w-120 items-center border border-indigo-500 bg-slate-50 rounded-sm shadow-xl mx-auto p-4">
      <h3 className="text-3xl text-indigo-600 text-center my-3 font-bold">
        {instance ? `Edit ${instance?.first_name}` : "Register"} Student
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 space-x-4">
            <div>
              {/* Student ID */}
              <FormField
                control={form.control}
                name="student_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input placeholder="12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Class field */}
              <FormField
                control={form.control}
                name="klass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Class</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {classes && classes.map((klass) => (
                            <SelectItem key={klass.id} value={klass.id.toString()}>{klass.name} {klass.group && klass.group} {klass.branch && klass.branch}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* First Name */}
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Father's Name */}
              <FormField
                control={form.control}
                name="fathers_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"Father's Name"}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mother's Name */}
              <FormField
                control={form.control}
                name="mothers_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"Mother's Name"}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              {/* Date Of Birth */}
              <FormField
                control={form.control}
                name="birth_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Of Birth</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Birth Certificate No */}
              <FormField
                control={form.control}
                name="birth_certificate_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Certificate No</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mobile No. */}
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile No.</FormLabel>
                    <FormControl>
                      <Input placeholder="017xxxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address No. */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="12 Road, Chittagong" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input onChange={handleImageChange} type="file" />
                </FormControl>
                <FormMessage />
              </FormItem>
              <Button className="mt-2" type="submit" disabled={loading}>
                {loading ? "Loading" : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
