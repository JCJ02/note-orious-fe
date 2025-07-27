import React from "react";
import { MdOutlineArchive } from "react-icons/md";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";

const EmptyArchiveNotes = () => {
  return (
    <Card className="flex flex-col items-center gap-2 shadow-none border-0">
      <MdOutlineArchive className="text-9xl text-gray-300" />
      <Label className="text-gray-300 font-extrabold text-5xl text-center">
        No Archive Notes in Archive
      </Label>
    </Card>
  );
};

export default EmptyArchiveNotes;
