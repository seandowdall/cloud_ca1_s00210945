"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

// Schema for validating a single JSON object or JSON file
const formSchema = z.object({
  singleJsonObject: z.string().optional(),
  jsonFile: z.instanceof(FileList).optional(),
});

// Define the types for your form values
type FormValues = z.infer<typeof formSchema>;

const TheForm: React.FC = () => {
  // Initialize the form with react-hook-form and Zod resolver
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, register, reset, watch } = methods;

  // This function will handle the form submission
  const onSubmit = async (data: FormValues) => {
    // If the user provided a single JSON object via the textarea
    if (data.singleJsonObject) {
      try {
        const jsonObject = JSON.parse(data.singleJsonObject);
        console.log("Single JSON Object:", jsonObject);
        // TODO: Handle the JSON object
      } catch (error) {
        console.error("Invalid JSON data provided.");
        // TODO: Provide user feedback about invalid JSON
      }
    }

    // If the user uploaded one or more JSON files
    if (data.jsonFile && data.jsonFile.length > 0) {
      // Assuming you only want to handle the first file
      const file = data.jsonFile[0];
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        // Ensure that `e.target` and `e.target.result` are not null
        const target = e.target as FileReader | null;
        if (target && target.result) {
          try {
            const fileContent = JSON.parse(target.result as string);
            console.log("JSON File Content:", fileContent);
            // TODO: Handle the JSON file content
          } catch (error) {
            console.error("Invalid JSON file.");
            // TODO: Provide user feedback about invalid JSON
          }
        }
      };
      fileReader.readAsText(file);
    }

    // Reset the form after submission
    reset();
  };

  // Watch for changes to the jsonFile field to provide user feedback or validation
  const jsonFileValue = watch("jsonFile");

  return (
    <div className="p-10">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <FormItem>
            <div className="flex flex-col space-y-2">
              <FormLabel>Single JSON Object</FormLabel>
              <FormControl>
                <textarea
                  {...register("singleJsonObject")}
                  className="border p-2"
                  placeholder='Enter a single JSON object here. Example: {"name": "Max", "type": "Dog"}'
                />
              </FormControl>
            </div>

            <FormDescription>
              Paste a single JSON object related to a pet.
            </FormDescription>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>JSON File</FormLabel>
            <FormControl>
              <Input type="file" {...register("jsonFile")} accept=".json" />
            </FormControl>
            <FormDescription>
              Upload a file containing multiple JSON objects related to pets.
            </FormDescription>
            <FormMessage />
          </FormItem>

          {/* Display the name of the uploaded file (if any) */}
          {jsonFileValue && jsonFileValue.length > 0 && (
            <div>
              <strong>Uploaded File:</strong> {jsonFileValue[0].name}
            </div>
          )}

          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default TheForm;
