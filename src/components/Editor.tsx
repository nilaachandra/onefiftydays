"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";
import { toast } from "sonner";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const JournalSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  content: z.string().min(1, "Content is required"),
  status: z.enum(["PUBLISHED", "DRAFTING", "ARCHIVED"]).default("DRAFTING"),
});

type JournalFormData = z.infer<typeof JournalSchema>;

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

const createJournal = async (data: JournalFormData) => {
  const response = await axios.post("/api/journal/write", data);
  return response.data;
};

export default function Editor() {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JournalFormData>({
    resolver: zodResolver(JournalSchema),
    defaultValues: {
      title: "",
      content: "",
      status: "DRAFTING",
    },
  });

  const mutation = useMutation({
    mutationFn: createJournal,
    onSuccess: () => {
      toast.success("Journal submitted successfully");
      reset();
      queryClient.invalidateQueries({ queryKey: ["journals"] });
    },
    onError: (error) => {
      console.error("Error submitting Journal:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Failed to submit Journal");
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });

  const onSubmit = (data: JournalFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1>Create a New Journal</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                id="title"
                placeholder="Enter your Journal title"
                {...field}
              />
            )}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="DRAFTING">Drafting</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && (
            <p className="text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                theme="snow"
                modules={quillModules}
                {...field}
                className="font-normal"
              />
            )}
          />
          {errors.content && (
            <p className="text-sm text-red-500">{errors.content.message}</p>
          )}
        </div>

        <CardFooter className="px-0">
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full"
          >
            {mutation.isPending ? "Submitting..." : "Submit Journal"}
          </Button>
        </CardFooter>
      </form>
    </div>
  );
}
