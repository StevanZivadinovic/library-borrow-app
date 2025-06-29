"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { FIELD_NAMES } from "@/constants";
interface Props<T extends FieldValues> {
  type: "sign-in" | "log-in";
  schema: z.ZodType<T, any, T>;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: any) => void;
  //data:FieldValues
  // Promise<{success: boolean, error?:string} >
}
const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleOnSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
  };
  return (
    <div className="mt-[40px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {Object.keys(defaultValues).map((key,i)=>{
            return(
              <FormField
                key={key}
                control={form.control}
                name={key as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--basic-gray)]">
                      {FIELD_NAMES[key as keyof typeof FIELD_NAMES] || key}
                    </FormLabel>
                    <FormControl className="bg-[var(--basic-native)]">
                      <Input
                        placeholder={`Type your ${key}..`}
                        {...field}
                        className="font-bold p-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          })}
         
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
