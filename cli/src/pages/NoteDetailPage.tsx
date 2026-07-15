import HighlightForm from "@/components/highlight/HighlightForm";
import HighlightedNote from "@/components/note/HighlightedNote";
import NoteHighlights from "@/components/note/NoteHighlights";
import { useNote } from "@/hooks/query/useNote";
import type { TextSelectionEvent } from "@/hooks/useTextSelection";
import type { Highlight } from "@/types/highlight";
import { useParams } from "@tanstack/react-router";
import React from "react";

const NoteDetailPage = () => {
  const { noteId } = useParams({
    from: "/notes/$noteId",
  });
  const { data: note, isLoading, error } = useNote(Number(noteId));

  const [highlights, setHighlights] = React.useState<Partial<Highlight>[]>(
    note?.highlights ?? [],
  );

  React.useEffect(() => {
    setHighlights(note?.highlights ?? []);
  }, [note]);

  const [editingHighlight, setEditingHighlight] =
    React.useState<Partial<Highlight>>();

  if (isLoading) return <div>Loading...</div>;
  if (error || !note) return <div>Failed to load note.</div>;

  const handleNewHighlight = ({ start, length }: TextSelectionEvent) => {
    const newHighlight = { start, length, noteId: note.id };
    setEditingHighlight(newHighlight);

    setHighlights([...note.highlights, newHighlight]);
  };

  const handleHighlightClick = (highlight: Highlight) => {
    setEditingHighlight(highlight);
  };

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <h1 className="mb-4 text-3xl font-bold">{note.title}</h1>

        <HighlightedNote
          content={note.content}
          highlights={highlights}
          onNewHighlight={handleNewHighlight}
          onHighlightClick={handleHighlightClick}
        />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Highlights</h1>
        {editingHighlight && <HighlightForm highlight={editingHighlight} />}
        <NoteHighlights highlights={note.highlights} />
      </div>
    </div>
  );
};

export default NoteDetailPage;
