import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";

const EmptyNotes = () => {
  return (
    <Card className="flex flex-col items-center gap-2 shadow-none border-0">
      <FaRegLightbulb className="text-9xl text-gray-300" />
      <Label className="text-gray-300 font-extrabold text-5xl">
        Empty Notes
      </Label>
    </Card>
  );
};

export default EmptyNotes;
