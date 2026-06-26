import type { INote } from "@/types/note";
import LabelChip from "./LabelChip";
import HighlightedNote from "./HighlightedNote";

interface NoteListItemProps {
  note: INote;
}

const NoteListItem = ({ note }: NoteListItemProps) => {
  return (
    <div>
      <div className="flex gap-2">
        <h2 className="text-xl font-semibold mb-2">{note.title}</h2>

        <div>
          {note.labels?.map((label) => (
            <LabelChip label={label} key={label.id} />
          ))}
        </div>
      </div>

      <HighlightedNote note={note} />
    </div>
  );
};

export default NoteListItem;
