import React from "react";
import { getRemindersLoader } from "./services/reminders.loader";
import { Form, useLoaderData } from "@remix-run/react";
import EmptyReminders from "./_components/EmptyReminders";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import AddReminderForm from "./_components/AddReminderForm";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Reminders - Note-orious Web App" },
    { name: "description", content: "Welcome to Note-orious Web App!" },
  ];
};

export const loader = getRemindersLoader;

const RemindersPage = () => {
  const { reminders } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col items-center gap-10 p-10 h-screen w-full">
      <AddReminderForm />
      <div className="flex flex-col items-center gap-10 p-10 h-screen w-full">
        {reminders.length === 0 ? (
          <EmptyReminders />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] items-start content-start gap-4 w-full">
            {reminders.map((note: any) => (
              <Card
                className="border-0 shadow-lg break-inside-avoid mb-4"
                key={note.id}
              >
                <CardHeader>
                  <CardTitle>{note.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-end gap-4">
                  <Label className="text-justify w-full">{note.content}</Label>
                  <Label className="text-justify w-full">{note.reminder}</Label>

                  <div className="flex items-center">
                    {/* <Form
                    method="post"
                    replace
                    onClick={(event) => event.stopPropagation()}
                  >
                    <input type="hidden" name="_method" value="unarchive" />
                    <input type="hidden" name="id" value={note.id} />
                    <button type="submit">
                      <LucideArchiveRestore className="text-2xl rounded-sm cursor-pointer hover:bg-gray-100 p-1" />
                    </button>
                  </Form> */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RemindersPage;
