import { Form, useLoaderData } from "@remix-run/react";
import React from "react";
import { getArchiveNotesLoader } from "./_services/archive.loader";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import EmptyArchiveNotes from "./_components/EmptyArchiveNotes";
import { LucideArchiveRestore } from "lucide-react";
import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { unarchiveNoteAction } from "./_services/archive.action";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export const meta: MetaFunction = () => {
  return [
    { title: "Archive - Note-orious Web App" },
    { name: "description", content: "Welcome to Note-orious Web App!" },
  ];
};

export const loader = getArchiveNotesLoader;

export const action = async (args: ActionFunctionArgs) => {
  const formData = await args.request.formData();
  const method = formData.get("_method");

  if (method === "unarchive") {
    return unarchiveNoteAction({ ...args, formData });
  }
};

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
              <CardContent className="flex flex-col items-end gap-4">
                <Label className="text-justify w-full">{note.content}</Label>

                <Form
                  method="post"
                  replace
                  onClick={(event) => event.stopPropagation()}
                >
                  <input type="hidden" name="_method" value="unarchive" />
                  <input type="hidden" name="id" value={note.id} />
                  <Tooltip>
                    <TooltipTrigger>
                      <button type="submit">
                        <LucideArchiveRestore className="text-2xl rounded-sm cursor-pointer hover:bg-gray-100 p-1" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <Label>Restore Note</Label>
                    </TooltipContent>
                  </Tooltip>
                </Form>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArchivePage;
