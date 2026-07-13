import { config } from "@/config";
import type { CreateNoteDto, Note, NotesQuery } from "@/types/note";
import type { PaginatedResult } from "@/types/pagination";
import { AbstractApi } from "./abstractApi";

class NotesService extends AbstractApi {
  constructor() {
    super(`${config.apiUrl}/notes`);
  }

  list(query?: NotesQuery): Promise<PaginatedResult<Note>> {
    const url = `${this.baseUrl}?${this.queryToSearchParams(query ?? {})}`;
    return this.request<PaginatedResult<Note>>(url);
  }

  findOne(id: number): Promise<Note> {
    return this.request<Note>(`${this.baseUrl}/${id}`);
  }

  create(dto: CreateNoteDto): Promise<Note> {
    return this.request<Note>(this.baseUrl, {
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
