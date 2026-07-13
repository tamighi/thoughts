import { notesService } from "@/services/NotesService";
import { useRef, useState } from "react";

type Props = {
  labelIds?: number[];
  onUploadComplete?: (notes: unknown[]) => void;
};

export const FolderUploadButton = ({ labelIds, onUploadComplete }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFilesSelected(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) return;

    setUploading(true);
    setError(null);

    try {
      const notes = await notesService.uploadMarkdownFiles(files, labelIds);
      onUploadComplete?.(notes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".md,text/markdown,text/plain"
        onChange={handleFilesSelected}
        style={{ display: "none" }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload folder"}
      </button>

      {error && <p>{error}</p>}
    </>
  );
};
