"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import ImageInput from "./ImageInput";
import Link from "next/link";
import signUpLogicSubmit from "@/database/signUpLogic";
import { signInSchema } from "@/lib/validations";
import { signInWithCredentials } from "@/lib/actions/auth";


interface Props<T extends FieldValues> {
  type: "sign-in" | "log-in";
  schema: z.ZodType<T, any, T>;
  defaultValues: DefaultValues<T>;
}
const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
}: Props<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  
  const handleOnSubmit =async  (values: z.infer<typeof schema>) => {
    if(type === 'sign-in'){
     await signUpLogicSubmit(values as unknown as z.infer<typeof signInSchema>)
      try{
        console.log(typeof values);
         form.reset();
      }catch(error){
        console.error("Error submitting form:", error);
      }
    }else if(type === 'log-in'){
        try{
           const res = await signInWithCredentials( {
      email: values.email,
      password: values.password,
    });
    console.log("Login response:", res);
    // if (res?.error) {
    //   console.log("Login failed:", res);
    // }
        }
        catch(error){
          console.error("Error logging in:", error);
        }
        
    }
    
  };
  return (
    <div className="mt-[40px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
          {Object.keys(defaultValues).map((key,i)=>{
            return(
              <FormField
                key={key}
                control={form.control}
                name={key as Path<T>}
                render={({ field }) => (
                  <FormItem className="-mt-1">
                    <FormLabel className="text-[var(--basic-gray)]">
                      {FIELD_NAMES[key as keyof typeof FIELD_NAMES] || key}
                    </FormLabel>
                    <FormControl className="bg-[var(--basic-native)]">
                      {
                        field?.name !== "universityCard" ?  <Input
                        required
                      type={FIELD_TYPES[key as keyof typeof FIELD_TYPES] || key}
                        placeholder={`Type your ${key}..`}
                        {...field}
                        className="font-bold p-5 mt-1"
                      />:<ImageInput 
                       value={field.value}            
                        onChange={field.onChange}/>      
                      }
                    
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          })}
         
          <Button type="submit" className="font-bold text-[var(--basic-dark-form-three)] cursor-pointer hover:bg-[var(--basic-cream-second)] bg-[var(--basic-gray)] w-full  py-5">{type==='sign-in' ? 'Sign in' : 'Log in'}</Button>
        {type==='sign-in' ? 
        <p className="text-center font-IBM-Plex font-medium text-[var(--basic-gray)]">Have an Account already? <Link href={'/log-in'} className="font-semibold text-[var(--basic-cream-second)]">Login</Link></p> :
      <p className="text-center font-IBM-Plex font-medium text-[var(--basic-gray)]">Don't have an account already?  <Link href={'/sign-in'} className="font-semibold text-[var(--basic-cream-second)]">Register here</Link> </p>
      }
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
