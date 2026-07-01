import { config } from "@/config";
import type { CreateNoteDto, INote, NotesQuery } from "@/types/note";
import type { IPaginatedResult } from "@/types/pagination";
import { AbstractApi } from "./abstractApi";

class NotesService extends AbstractApi {
  constructor() {
    super(`${config.apiUrl}/notes`);
  }

  list(query?: NotesQuery): Promise<IPaginatedResult<INote>> {
    const url = `${this.baseUrl}?${this.queryToSearchParams(query ?? {})}`;
    return this.request<IPaginatedResult<INote>>(url);
  }

  create(dto: CreateNoteDto): Promise<INote> {
    return this.request<INote>(this.baseUrl, {
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
