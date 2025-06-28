"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, FieldValues, useForm } from "react-hook-form"
import { z } from "zod"
interface Props<T extends FieldValues> {
  type: "sign-in" | "log-in";
  schema: z.ZodType<T, any, T>; 
  defaultValues: DefaultValues<T>;
  onSubmit: () => void;
  //data:FieldValues
  // Promise<{success: boolean, error?:string} >
}
const AuthForm = <T extends FieldValues>({type, schema, defaultValues, onSubmit}:Props<T>) => {
   const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })

   const handleOnSubmit=(values: z.infer<typeof schema>)=> {
    console.log(values)
  }
  return (
    <div>
        AuthForm --{type}
    </div>
  )
}

export default AuthForm;