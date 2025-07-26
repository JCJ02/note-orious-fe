import React from "react";
import AddNoteForm from "./_components/AddNoteForm";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import EmptyNotes from "./_components/EmptyNotes";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { createNoteAction } from "./_services/notes.action";
import { getNotesLoader } from "./_services/notes.loader";

export const meta: MetaFunction = () => {
  return [
    { title: "Notes - Note-orious Web App" },
    { name: "description", content: "Welcome to Note-orious Web App!" },
  ];
};

export const action = createNoteAction;
export const loader = getNotesLoader;

const NotesPage = () => {
  const { notes } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-center gap-10 p-10 h-screen w-full">
      <AddNoteForm />
      {notes.length === 0 ? (
        <EmptyNotes />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 w-full">
          {notes.map((note: any) => (
            <Card className="border-0 shadow-lg" key={note.id}>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-start gap-4">
                <Label className="text-justify">{note.content}</Label>
                <div className="flex items-center gap-1 self-end">
                  <FaRegEdit className="text-2xl rounded-sm cursor-pointer hover:bg-gray-100 p-1" />
                  <FaRegTrashCan className="text-2xl rounded-sm cursor-pointer hover:bg-gray-100 p-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesPage;
