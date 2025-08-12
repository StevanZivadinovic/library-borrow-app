"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
// import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ImageInput from "@/components/ImageInput";
import { useEffect } from "react";
import ColorPicker from "../ColorPicker";
import { addBookToDB } from "@/lib/actions/admin/addBookToDB";
import { toast } from "sonner";
// import FileUpload from "@/components/FileUpload";
// import ColorPicker from "@/components/admin/ColorPicker";
// import { createBook } from "@/lib/admin/actions/book";
// import { toast } from "@/hooks/use-toast";

interface Props extends Partial<BookType> {
  type?: "create" | "update";
}

const BookForm = ({ type, ...book }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      rating: 1,
      totalCopies: 1,
      coverUrl: "",
      coverColor: "",
      // videoUrl: "",
      summary: "",
    },
  });
console.log(form.formState.errors, `Boja` + form.getValues("coverColor"));
  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    console.log("Form submitted with values:", values);
     const result = await addBookToDB(values as BookType);

    if (result.success) {
      toast("Book created successfully");

      router.push(`/admin/books/${result?.data?.id}`);
    } else {
      toast("Error creating book: " + result.message)
       
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-[var(--admin-basic-black)]">
                Book Title
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book title"
                  {...field}
                  className="
                  caret-black text-[var(--admin-basic-black)]
                min-h-12 border border-gray-100 
                bg-[var(--admin-book-form-input-bg)]
                p-4 text-base font-semibold placeholder:font-normal
                placeholder:text-[var(--admin-book-form-placeholder)] !important"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"author"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500 text-[var(--admin-basic-black)]">
                Author
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book author"
                  {...field}
                  className="
                  caret-black text-[var(--admin-basic-black)]
                min-h-12 border border-gray-100 
                bg-[var(--admin-book-form-input-bg)]
                p-4 text-base font-semibold placeholder:font-normal
                placeholder:text-[var(--admin-book-form-placeholder)] !important"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"genre"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500 text-[var(--admin-basic-black)]">
                Genre
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book genre"
                  {...field}
                  className="
                  caret-black text-[var(--admin-basic-black)]
                min-h-12 border border-gray-100 
                bg-[var(--admin-book-form-input-bg)]
                p-4 text-base font-semibold placeholder:font-normal
                placeholder:text-[var(--admin-book-form-placeholder)] !important"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"rating"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500 text-[var(--admin-basic-black)]">
                Rating
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  placeholder="Book rating"
                  {...field}
                  className="
                  caret-black text-[var(--admin-basic-black)]
                min-h-12 border border-gray-100 
                bg-[var(--admin-book-form-input-bg)]
                p-4 text-base font-semibold placeholder:font-normal
                placeholder:text-[var(--admin-book-form-placeholder)] !important"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"totalCopies"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500 text-[var(--admin-basic-black)]">
                Total number of books
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={10000}
                  placeholder="Total copies"
                  {...field}
                  className="
                  caret-black text-[var(--admin-basic-black)]
                min-h-12 border border-gray-100 
                bg-[var(--admin-book-form-input-bg)]
                p-4 text-base font-semibold placeholder:font-normal
                placeholder:text-[var(--admin-book-form-placeholder)] !important"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverUrl"
          rules={{ required: "Book image is required!" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500 text-[var(--admin-basic-black)]">Book Image</FormLabel>
              <FormControl>
              <ImageInput type="image" value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverColor"
          rules={{ required: "Book color is required!" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500 text-[var(--admin-basic-black)]">Book Primary Color</FormLabel>
              <FormControl>
              <ColorPicker value={field.value} onPickerChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

       
        {/* <FormField
          control={form.control}
          name="videoUrl"
          rules={{ required: "Book video is required!" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500 text-[var(--admin-basic-black)]">Book Video</FormLabel>
              <FormControl>
              <ImageInput type="video" value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name={"summary"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500 text-[var(--admin-basic-black)]">
                Book Summary
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book summary"
                  {...field}
                  rows={5}
                  className="
                  caret-black text-[var(--admin-basic-black)]
                min-h-12 border border-gray-100 
                bg-[var(--admin-book-form-input-bg)]
                p-4 text-base font-semibold placeholder:font-normal
                placeholder:text-[var(--admin-book-form-placeholder)] !important"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="book-form_btn text-white cursor-pointer">
          Add Book to Library
        </Button>
      </form>
    </Form>
  );
};
export default BookForm;
