import React from "react";
import { getSoftDeletedNotesList } from "./_services/trash.loader";
import { Form, useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import EmptyTrash from "./_components/EmptyTrash";
import { LiaTrashRestoreSolid, LiaTrashSolid } from "react-icons/lia";
import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  deleteNoteAction,
  restoreSoftDeletedNoteAction,
} from "./_services/trash.actions";

export const meta: MetaFunction = () => {
  return [
    { title: "Trash - Note-orious Web App" },
    { name: "description", content: "Welcome to Note-orious Web App!" },
  ];
};

export const loader = getSoftDeletedNotesList;

export const action = async (args: ActionFunctionArgs) => {
  const formData = await args.request.formData();
  const method = formData.get("_method");

  if (method === "restore-soft-deleted") {
    return restoreSoftDeletedNoteAction({ ...args, formData });
  }

  if (method === "delete") {
    return deleteNoteAction({ ...args, formData });
  }
};

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

                <div className="flex items-center">
                  <Form
                    method="post"
                    replace
                    onClick={(event) => event.stopPropagation()}
                  >
                    <input
                      type="hidden"
                      name="_method"
                      value="restore-soft-deleted"
                    />
                    <input type="hidden" name="id" value={note.id} />
                    <button type="submit">
                      <LiaTrashRestoreSolid className="text-2xl rounded-sm cursor-pointer hover:bg-gray-100 p-1" />
                    </button>
                  </Form>
                  <Form
                    method="post"
                    replace
                    onClick={(event) => event.stopPropagation()}
                  >
                    <input type="hidden" name="_method" value="delete" />
                    <input type="hidden" name="id" value={note.id} />
                    <button type="submit">
                      <LiaTrashSolid className="text-2xl rounded-sm cursor-pointer hover:bg-gray-100 p-1" />
                    </button>
                  </Form>
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
