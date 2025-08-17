import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";

const EmptyReminders = () => {
  return (
    <Card className="flex flex-col items-center gap-2 shadow-none border-0">
      <IoMdNotificationsOutline className="text-9xl text-gray-300" />
      <Label className="text-gray-300 font-extrabold text-5xl text-center">
        No Notes with Reminder Here
      </Label>
    </Card>
  );
};

export default EmptyReminders;
