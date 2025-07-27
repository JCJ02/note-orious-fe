import React, { useState } from "react";
import AddNoteForm from "./_components/AddNoteForm";
import { Form, useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import EmptyNotes from "./_components/EmptyNotes";
import { FaRegTrashCan } from "react-icons/fa6";
import {
  createNoteAction,
  softDeleteNoteAction,
  updateNoteAction,
} from "./_services/notes.actions";
import { getNotesLoader } from "./_services/notes.loader";
import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import Modal from "~/components/Modal";
import EditNoteForm from "./_components/EditNoteForm";

export const meta: MetaFunction = () => {
  return [
    { title: "Notes - Note-orious Web App" },
    { name: "description", content: "Welcome to Note-orious Web App!" },
  ];
};

export const loader = getNotesLoader;
export const action = async (args: ActionFunctionArgs) => {
  const formData = await args.request.formData();
  const method = formData.get("_method");

  if (method === "put") {
    return updateNoteAction({ ...args, formData });
  }

  if (method === "delete") {
    return softDeleteNoteAction({ ...args, formData });
  }

  return createNoteAction({ ...args, formData });
};

interface Note {
  id: number;
  title: string;
  content: string;
}

const NotesPage = () => {
  const { notes } = useLoaderData<typeof loader>();

  const [editNoteForm, setEditNoteForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any>(null);

  // HANDLE EDIT NOTE FORM
  const handleOpenEditNoteForm = (note: any) => {
    setSelectedNote(note);
    setEditNoteForm(true);
  };
  const handleCloseEditNoteForm = () => {
    setEditNoteForm(false);
    setSelectedNote(null);
  };

  return (
    <div className="flex flex-col items-center gap-10 p-10 h-screen w-full">
      <AddNoteForm />
      {notes.length === 0 ? (
        <EmptyNotes />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] items-start content-start gap-4 w-full">
          {notes.map((note: Note) => (
            <Card
              className="border-0 shadow-lg break-inside-avoid mb-4"
              key={note.id}
              onClick={() => handleOpenEditNoteForm(note)}
            >
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-end gap-4">
                <Label className="text-justify">{note.content}</Label>

                <Form
                  method="post"
                  replace
                  onClick={(event) => event.stopPropagation()}
                >
                  <input type="hidden" name="_method" value="delete" />
                  <input type="hidden" name="id" value={note.id} />
                  <button type="submit">
                    <FaRegTrashCan className="text-2xl rounded-sm cursor-pointer hover:bg-gray-100 p-1" />
                  </button>
                </Form>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* EDIT NOTE MODAL */}
      <Modal isOpen={editNoteForm} onClose={handleCloseEditNoteForm}>
        <EditNoteForm note={selectedNote} onClose={handleCloseEditNoteForm} />
      </Modal>
    </div>
  );
};

export default NotesPage;
