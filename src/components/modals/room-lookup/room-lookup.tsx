import Dropdown from "@/components/modals/room-lookup/dropdown";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { days } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";

interface RoomLookupModalProps {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoomLookupModal: React.FC<RoomLookupModalProps> = ({
  isOpened,
  setIsOpened,
}) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);

  const handleRoomLookup = async () => {
    if (isPending) return;
    setIsPending(true);
    const res = await axios.get(
      `/api/fetch/emptyClasses?dayIndex=${selectedDay}&lessonIndex=${
        selectedLesson < 1 ? 1 : selectedLesson
      }`,
    );

    if (res.data.success) {
      setData(res.data.classes);
    }

    setIsPending(false);
  };

  return (
    <Dialog open={isOpened} onOpenChange={() => setIsOpened(!isOpened)}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#212121] border-0">
        <DialogHeader>
          <DialogTitle>Wyszukaj wolną salę</DialogTitle>
          <DialogDescription>
            Zostaną wyświetlone wszystkie wolne sale w wybranym dniu i godzinie
            lekcyjnej.
          </DialogDescription>
        </DialogHeader>

        <ToggleGroup
          defaultValue={selectedDay.toString()}
          onValueChange={(e) => setSelectedDay(+e)}
          type="single"
          className="flex justify-center flex-wrap pt-2"
        >
          {days.map((day) => (
            <ToggleGroupItem
              key={day.index}
              value={day.index.toString()}
              variant="roomLookup"
              size="roomLookup"
            >
              <p>{day.short}</p>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <div className="w-full flex justify-center">
          <Input
            type="number"
            tabIndex={-1}
            placeholder="Numer lekcji"
            className="bg-gray-50 block w-1/2 p-2 border-gray-300 text-center dark:bg-[#171717] dark:border-0 outline-none"
            onChange={(e) => {
              const value = e.target.value;
              setSelectedLesson(+value);
            }}
          />
        </div>

        <Dropdown data={data} setIsOpened={setIsOpened} />
        <DialogFooter>
          <Button
            type="submit"
            variant="outline"
            onClick={() => setIsOpened(!isOpened)}
            className="mt-2 sm:mt-0"
          >
            Anuluj
          </Button>

          <Button type="submit" disabled={isPending} onClick={handleRoomLookup}>
            {isPending ? "Wyszukiwanie..." : "Wyszukaj"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoomLookupModal;
