import { FaRegTrashCan } from "react-icons/fa6";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";

const EmptyTrash = () => {
  return (
    <Card className="flex flex-col items-center gap-2 shadow-none border-0">
      <FaRegTrashCan className="text-9xl text-gray-300" />
      <Label className="text-gray-300 font-extrabold text-5xl text-center">
        No Notes in Trash
      </Label>
    </Card>
  );
};

export default EmptyTrash;
