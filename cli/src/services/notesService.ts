import type { CreateNoteDto, INote, NotesQuery } from "@/types/note";
import { http } from "./http";
import type { IPaginatedResult } from "@/types/pagination";

const API_URL = "http://localhost:3000";

class NotesService {
  list(query?: NotesQuery): Promise<IPaginatedResult<INote>> {
    const url = `${API_URL}/notes?${this.queryToSearchParams(query ?? {})}`;
    return http<IPaginatedResult<INote>>(url);
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

  protected queryToSearchParams(query: object) {
    const searchParams = new URLSearchParams(
      Object.entries(query)
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => [k, String(v)]),
    );

    return searchParams.toString();
  }
}

export const notesService = new NotesService();
