import type { Note } from "@/types/note";
import { Link } from "@tanstack/react-router";
import LabelChip from "../label/LabelChip";

interface NoteListItemProps {
  note: Note;
}

const NoteListItem = ({ note }: NoteListItemProps) => {
  return (
    <div>
      <div className="mb-2 flex gap-2 items-center">
        <Link
          to="/notes/$noteId"
          params={{ noteId: note.id.toString() }}
          className="text-xl font-semibold hover:underline"
        >
          {note.title}
        </Link>
        <span className="italic">({note.highlights.length} highlights)</span>

        <div className="flex gap-2">
          {note.labels?.map((label) => (
            <LabelChip key={label.id} label={label} />
          ))}
        </div>
      </div>

      <span className="line-clamp-4 whitespace-break-spaces">
        {note.content}
      </span>
    </div>
  );
};

export default NoteListItem;
