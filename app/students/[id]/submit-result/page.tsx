"use client";

import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {SubjectField } from "@/lib/TypeOF";
import { subjectList, submitAddStudentInfo, submitMarks } from "@/utils/fetchStudent";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export default function Page({ params }: { params: { id: string } }) {
  const methods = useForm()
  const [subjectField, setSubjectField] = useState<SubjectField[]>([]);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  // Fetch the dynamic fields
  const getField = async () => {
    try {
      const response = await subjectList(params.id);
      if (response) {
        setSubjectField(response);
      } else {
        setSubjectField([]);
      }
    } catch (error: any) {
      toast({
        title: "Heads Up!",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getField();
  }, []);

  // Handle changes for text inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();

    // Add other form values
    for (const key in formValues) {
      formData.append(key, formValues[key]);
    }

    try {
      const response = await submitMarks(formData);
      if (response) {
        toast({ title: "Success", description: "Data submitted successfully!" });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-8/12 shadow-md rounded-sm p-2 border border-indigo-500 px-5">
      <h1 className="text-3xl text-indigo-500 text-center">
        Mark Submission
      </h1>
      <hr className="space-y-2" />
      <Form  {...methods}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-2 space-x-2 first:ml-0  items-start ">
          {subjectField.map((field, index) => (
            <FormItem className="my-2" key={index}>
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Input
                  name={`${params.id}_${field.id}`}
                  type="number"
                  onChange={handleInputChange}
                  placeholder="Enter value"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          ))}
        </div>
        <button
          type="submit"
          className={`bg-indigo-600 text-white py-2 px-4 rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      </Form>
      
    </div>
  );
}
