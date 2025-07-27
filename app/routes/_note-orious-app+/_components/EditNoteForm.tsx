import { Form, useActionData, useRevalidator } from "@remix-run/react";
import React, { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { updateNoteAction } from "../_services/notes.actions";

interface EditNoteFormProps {
  note: {
    id: number;
    title: string;
    content: string;
  } | null;
  onClose: () => void;
}

const EditNoteForm: React.FC<EditNoteFormProps> = ({ note, onClose }) => {
  const updateNoteActionData = useActionData<typeof updateNoteAction>();
  const { revalidate } = useRevalidator();

  useEffect(() => {
    if (
      updateNoteActionData &&
      "success" in updateNoteActionData &&
      updateNoteActionData.success
    ) {
      revalidate();
      onClose();
    }
  }, [updateNoteActionData, revalidate, onClose]);

  return (
    <Form
      method="post"
      className="bg-white flex flex-col items-start shadow-lg p-5 w-full rounded-md lg:w-[600px]"
    >
      {/* HIDDEN METHOD */}
      <input type="hidden" name="_method" value="put" />

      {/* ID */}
      <Input type="hidden" name="id" value={note?.id} />

      {/* TITLE */}
      <Input
        name="title"
        defaultValue={note?.title ?? ""}
        className="font-bold text-sm md:text-md lg:text-lg border-0 shadow-none w-full"
        placeholder="Title"
      />
      {updateNoteActionData &&
        "errors" in updateNoteActionData &&
        updateNoteActionData.errors?.title && (
          <p className="text-red-500 text-sm">
            {updateNoteActionData.errors.title[0]}
          </p>
        )}

      {/* CONTENT */}
      <Textarea
        name="content"
        defaultValue={note?.content ?? ""}
        className="border-0 shadow-none h-80 w-full"
        placeholder="Take a Note..."
      />
      {updateNoteActionData &&
        "errors" in updateNoteActionData &&
        updateNoteActionData.errors?.content && (
          <p className="text-red-500 text-sm">
            {updateNoteActionData.errors.content[0]}
          </p>
        )}

      {/* ERROR MESSAGE */}
      {updateNoteActionData &&
        "errors" in updateNoteActionData &&
        updateNoteActionData.errors?.formError && (
          <h1 className="font-roboto p-2 mb-4 text-red-600 bg-red-100 border border-red-300 rounded w-full">
            {updateNoteActionData.errors.formError[0]}
          </h1>
        )}

      <Button
        type="submit"
        className="bg-white text-[#262626] shadow-none self-end my-2 hover:bg-gray-100"
      >
        Edit Note
      </Button>
    </Form>
  );
};

export default EditNoteForm;
