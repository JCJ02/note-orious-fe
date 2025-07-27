import { z } from "zod";

const CreateNoteSchema = z.object({
  title: z.string().min(1, "Title is Required!"),
  content: z.string().min(1, "Content is Required!"),
});

const UpdateNoteSchema = z.object({
  title: z.string().min(1, "Title is Required!"),
  content: z.string().min(1, "Content is Required!"),
});

export { CreateNoteSchema, UpdateNoteSchema };
