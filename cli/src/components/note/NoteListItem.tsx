import type { Note } from "@/types/note";
import { Link } from "@tanstack/react-router";
import HighlightedNote from "./HighlightedNote";
import LabelChip from "../label/LabelChip";

interface NoteListItemProps {
  note: Note;
}

const NoteListItem = ({ note }: NoteListItemProps) => {
  return (
    <div>
      <div className="mb-2 flex gap-2">
        <Link
          to="/notes/$noteId"
          params={{ noteId: note.id.toString() }}
          className="text-xl font-semibold hover:underline"
        >
          {note.title}
        </Link>

        <div className="flex gap-2">
          {note.labels?.map((label) => (
            <LabelChip key={label.id} label={label} />
          ))}
        </div>
      </div>

      <HighlightedNote
        className="line-clamp-4"
        highlights={note.highlights}
        content={note.content}
      />
    </div>
  );
};

export default NoteListItem;
