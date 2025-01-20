import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { SetStateAction } from 'react'

export default function CustomFileField({label,fileStateFn}:{label: string,  fileStateFn: (value: SetStateAction<File | null>) => void}) {
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files as FileList;
        fileStateFn(selectedFile[0]);
      };
  return (
    <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <Input onChange={handleImageChange} type="file" />
    </FormControl>
    <FormMessage />
  </FormItem>
  )
}
