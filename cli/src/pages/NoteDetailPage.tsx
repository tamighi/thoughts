import { useParams } from "@tanstack/react-router";
import { useNote } from "@/hooks/query/useNote";
import HighlightedNote from "@/components/HighlightedNote";
import NoteHighlights from "@/components/NoteHighlights";

const NoteDetailPage = () => {
  const { noteId } = useParams({
    from: "/notes/$noteId",
  });

  const id = Number(noteId);
  const { data: note, isLoading, error } = useNote(id);

  if (isLoading) {
    return <p>Loading note...</p>;
  }

  if (error || !note) {
    return <p>Failed to load note.</p>;
  }

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">{note.title}</h1>

      <div className="flex gap-4">
        <HighlightedNote className="flex-1" note={note} />
        <div className="flex-1">
          <span>Note highlights</span>
          <NoteHighlights note={note} />
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
