import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getArchiveNotesLoader } from "./_services/archive.loader";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Label } from "~/components/ui/label";
import EmptyArchiveNotes from "./_components/EmptyArchiveNotes";

export const loader = getArchiveNotesLoader;

const ArchivePage = () => {
  const { archiveNotes } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col items-center gap-10 p-10 h-screen w-full">
      {archiveNotes.length === 0 ? (
        <EmptyArchiveNotes />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] items-start content-start gap-4 w-full">
          {archiveNotes.map((note: any) => (
            <Card
              className="border-0 shadow-lg break-inside-avoid mb-4"
              key={note.id}
            >
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

export default ArchivePage;
