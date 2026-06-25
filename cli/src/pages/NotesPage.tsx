import { useNotes } from "@/hooks/query/useNotes";
import NoteListItem from "@/components/NoteListItem";

const NotesPage = () => {
  const { data: notes, isLoading, error } = useNotes();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Failed to load notes.</div>;

  return (
    <div>
      <h1>Notes</h1>

      {notes?.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul>
          {notes?.map((note) => (
            <NoteListItem key={note.id} note={note} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotesPage;
