
import { Control, Controller } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectGroup, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function CustomSelector({control, label, dataList, placeHolder}:{control: Control<any>, label: string,
    dataList: {
        key: string,
        value: string,
        title: string,
    }[],
    placeHolder: string
}) {
  return (
    <FormField
                  control={control}
                  name="klass"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>{label}</FormLabel>
                
                      <Controller 
                      name="klass"
                      render={({field}) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeHolder} /> 
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                          {dataList && dataList.map((data) => (
                            <SelectItem key={data.key} value={data.value} >{data.title}</SelectItem>
                          ))}
                          </SelectGroup>
                          
                           
                        </SelectContent>
                    </Select>
                      )}
                      
                      />
                      <FormMessage />
                  </FormItem>
                    )}
                />
  )
}
