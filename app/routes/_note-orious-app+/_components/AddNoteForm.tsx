import { Form, useActionData } from "@remix-run/react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { action } from "../notes";

const AddNoteForm = () => {
  const takeNote = useActionData<typeof action>();
  const [showAll, setShowAll] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear Fields and Collapse After Successful Action
  useEffect(() => {
    if (takeNote && "success" in takeNote && takeNote.success) {
      formRef.current?.reset();
      setShowAll(false);
    }
  }, [takeNote]);

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
      className="flex flex-col items-center shadow-lg p-5 w-full lg:w-[600px]"
    >
      <Input
        name="title"
        className={`${
          showAll ? "flex" : "hidden"
        } font-bold text-sm md:text-md lg:text-lg border-0 shadow-none w-full`}
        placeholder="Title"
      />
      <Textarea
        name="content"
        className="border-0 shadow-none w-full"
        placeholder="Take a Note..."
        onClick={() => setShowAll(true)}
      />
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
