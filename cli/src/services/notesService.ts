import type { CreateNoteDto, INote } from "@/types/note";
import { http } from "./http";

const API_URL = "http://localhost:3000";

class NotesService {
  list(): Promise<INote[]> {
    return http<INote[]>(`${API_URL}/notes`);
  }

  create(dto: CreateNoteDto): Promise<INote> {
    return http<INote>(`${API_URL}/notes`, {
      method: "POST",
      body: JSON.stringify(dto),
    });
  }

  async uploadMarkdownFiles(files: File[], labelIds?: number[]) {
    const mdFiles = files.filter((file) =>
      file.name.toLowerCase().endsWith(".md"),
    );

    const results = [];

    for (const file of mdFiles) {
      const content = await file.text();

      const title = file.name.replace(/\.md$/i, "");

      const note = await this.create({
        title,
        content,
        labelIds,
      });

      results.push(note);
    }
    return results;
  }
}

export const notesService = new NotesService();
