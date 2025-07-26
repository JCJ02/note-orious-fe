import React from "react";
import AddNoteForm from "../_components/AddNoteForm";

const RemindersPage = () => {
  return (
    <div className="flex flex-col items-center gap-10 p-10 h-screen w-full">
      <AddNoteForm />
      <div>Notes List</div>
    </div>
  );
};

export default RemindersPage;
