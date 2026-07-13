import { useState } from "react";
import type { Highlight } from "@/types/highlight";
import HighlightedNote from "@/components/note/HighlightedNote";
import HighlightDialog, {
  type HighlightSelection,
  type SaveHighlightData,
} from "@/components/highlight/HighlightDialog";
import type { TextSelectionEvent } from "@/hooks/useTextSelection";
import { useNote } from "@/hooks/query/useNote";
import { useParams } from "@tanstack/react-router";
import NoteHighlights from "@/components/note/NoteHighlights";

const NoteDetailPage = () => {
  const { noteId } = useParams({
    from: "/notes/$noteId",
  });
  const { data: note, isLoading, error } = useNote(Number(noteId));

  const [selection, setSelection] = useState<HighlightSelection>();

  const [editingHighlight, setEditingHighlight] = useState<Highlight>();

  const dialogOpen = Boolean(selection) || Boolean(editingHighlight);

  const handleNewHighlight = ({ start, length }: TextSelectionEvent) => {
    setEditingHighlight(undefined);
    setSelection({ start, length });
  };

  const handleHighlightClick = (highlight: Highlight) => {
    setSelection(undefined);
    setEditingHighlight(highlight);
  };

  const handleClose = () => {
    setSelection(undefined);
    setEditingHighlight(undefined);
    window.getSelection()?.removeAllRanges();
  };

  const handleSave = async (data: SaveHighlightData) => {
    if (!note) return;

    if (editingHighlight) {
      console.log("Update highlight", {
        id: editingHighlight.id,
        ...data,
      });
    } else {
      console.log("Create highlight", {
        noteId: note.id,
        ...data,
      });
    }

    handleClose();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !note) return <div>Failed to load note.</div>;

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <h1 className="mb-4 text-3xl font-bold">{note.title}</h1>

        <HighlightedNote
          note={note}
          onNewHighlight={handleNewHighlight}
          onHighlightClick={handleHighlightClick}
        />
      </div>
      <div className="flex-1">
        <h1 className="mb-4 text-3xl font-bold">Highlights</h1>
        <NoteHighlights note={note} />
      </div>
      <HighlightDialog
        open={dialogOpen}
        note={note}
        selection={selection}
        highlight={editingHighlight}
        onClose={handleClose}
        onSave={handleSave}
      />
    </div>
  );
};

export default NoteDetailPage;
