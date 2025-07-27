import React from "react";
import { getSoftDeletedNotesList } from "./_services/trash.loader";
import { useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { FaRegTrashCan } from "react-icons/fa6";
import EmptyTrash from "./_components/EmptyTrash";

export const loader = getSoftDeletedNotesList;

const TrashPage = () => {
  const { softDeletedNotes } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col items-center gap-10 p-10 h-screen w-full">
      {softDeletedNotes.length === 0 ? (
        <EmptyTrash />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] items-start content-start gap-4 w-full">
          {softDeletedNotes.map((note: any) => (
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

export default TrashPage;
