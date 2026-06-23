export type CreateNoteDto = {
  title: string;
  content: string;
  labelIds?: number[];
};

const API_URL = "http://localhost:3000/notes";

class NotesService {
  async createNote(dto: CreateNoteDto) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    if (!res.ok) {
      throw new Error(`Failed to create note: ${res.status}`);
    }

    return res.json();
  }

  async uploadMarkdownFiles(files: File[], labelIds?: number[]) {
    const mdFiles = files.filter((file) =>
      file.name.toLowerCase().endsWith(".md"),
    );

    const results = [];

    for (const file of mdFiles) {
      const content = await file.text();

      const title = file.name.replace(/\.md$/i, "");

      const note = await this.createNote({
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
