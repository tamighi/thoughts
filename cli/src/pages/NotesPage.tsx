import { useNotes } from "@/hooks/query/useNotes";
import NoteListItem from "@/components/NoteListItem";

const NotesPage = () => {
  const { data: notes, isLoading, error } = useNotes();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Failed to load notes.</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Notes</h1>

      {notes?.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {notes?.map((note) => (
            <NoteListItem key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesPage;
