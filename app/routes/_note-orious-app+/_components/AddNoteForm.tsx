import { Form, useActionData } from "@remix-run/react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { createNoteAction } from "../_services/notes.actions";

const AddNoteForm = () => {
  const createNoteActionData = useActionData<typeof createNoteAction>();
  const [showAll, setShowAll] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (
      createNoteActionData &&
      "success" in createNoteActionData &&
      createNoteActionData.success
    ) {
      // Hide Title
      setShowAll(!showAll);
      // Clear Fields
      formRef.current?.reset();
    }
  }, [createNoteActionData]);

  // Handle Click Outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        // Hide Title
        setShowAll(false);

        // Clear Fields
        formRef.current?.reset();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Form
      method="post"
      ref={formRef}
      className="flex flex-col items-start shadow-lg p-5 w-full lg:w-[600px]"
    >
      {/* TITLE */}
      <Input
        name="title"
        className={`${
          showAll ? "flex" : "hidden"
        } font-bold text-sm md:text-md lg:text-lg border-0 shadow-none w-full`}
        placeholder="Title"
      />
      {createNoteActionData &&
        "errors" in createNoteActionData &&
        createNoteActionData.errors?.title && (
          <p className="text-red-500 text-sm">
            {createNoteActionData.errors.title[0]}
          </p>
        )}

      {/* CONTENT */}
      <Textarea
        name="content"
        className="border-0 shadow-none w-full"
        placeholder="Take a Note..."
        onClick={() => setShowAll(true)}
      />
      {createNoteActionData &&
        "errors" in createNoteActionData &&
        createNoteActionData.errors?.content && (
          <p className="text-red-500 text-sm">
            {createNoteActionData.errors.content[0]}
          </p>
        )}

      {/* ERROR MESSAGE */}
      {createNoteActionData &&
        "errors" in createNoteActionData &&
        createNoteActionData.errors?.formError && (
          <h1 className="font-roboto p-2 mb-4 text-red-600 bg-red-100 border border-red-300 rounded w-full">
            {createNoteActionData.errors.formError[0]}
          </h1>
        )}
      <Button
        type="submit"
        className={`${
          showAll ? "flex" : "hidden"
        } text-[#262626] bg-white shadow-none self-end my-2 hover:bg-gray-100`}
      >
        Take Note
      </Button>
    </Form>
  );
};

export default AddNoteForm;
