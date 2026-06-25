import type { INote } from "@/types/note";

interface NoteListItemProps {
  note: INote;
}

const NoteListItem = ({ note }: NoteListItemProps) => {
  return (
    <li>
      <h2>{note.title}</h2>

      <p>{note.content}</p>

      {note.labels?.length ? (
        <div>
          <p>Labels:</p>
          <ul>
            {note.labels.map((label) => (
              <li key={label.id}>{label.content}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <p>Highlights: {note.highlights?.length ?? 0}</p>
    </li>
  );
};

export default NoteListItem;
