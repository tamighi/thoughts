import HighlightForm from "@/components/highlight/HighlightForm";
import HighlightedNote, {
  type HighlightWithColor,
} from "@/components/note/HighlightedNote";
import NoteHighlights from "@/components/note/NoteHighlights";
import { useNote } from "@/hooks/query/notes/useNote";
import type { TextSelectionEvent } from "@/hooks/useTextSelection";
import type { Highlight } from "@/types/highlight";
import { useParams } from "@tanstack/react-router";
import React from "react";

const NoteDetailPage = () => {
  const { noteId } = useParams({
    from: "/notes/$noteId",
  });
  const { data: note, isLoading, error } = useNote(Number(noteId));

  const [highlights, setHighlights] = React.useState<HighlightWithColor[]>(
    note?.highlights ?? [],
  );

  const [editingHighlight, setEditingHighlight] =
    React.useState<Partial<Highlight>>();

  React.useEffect(() => {
    setHighlights(note?.highlights ?? []);
    setEditingHighlight(undefined);
  }, [note]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !note) return <div>Failed to load note.</div>;

  const handleNewHighlight = ({ start, length }: TextSelectionEvent) => {
    const newHighlight = {
      start,
      length,
      noteId: note.id,
      color: "red",
    } as HighlightWithColor;
    setEditingHighlight(newHighlight);

    setHighlights([...note.highlights, newHighlight]);
  };

  const onHighlightHover = (highlight: Highlight | null) => {
    if (highlight) {
      setHighlights((hs) =>
        hs.map((h) => (h.id === highlight.id ? { ...h, color: "purple" } : h)),
      );
    } else {
      setHighlights(
        note.highlights.map((h) =>
          h.id === editingHighlight?.id ? { ...h, color: "red" } : h,
        ),
      );
    }
  };

  const handleHighlightClick = (highlight: Highlight) => {
    setEditingHighlight(highlight);
    setHighlights(
      note.highlights.map((h) =>
        h.id === highlight.id ? { ...h, color: "red" } : h,
      ),
    );
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
          onHighlightHover={onHighlightHover}
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
