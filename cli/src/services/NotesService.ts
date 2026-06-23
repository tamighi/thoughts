class NotesService {
  private notes: string[] = [];

  addNote(note: string): void {
    this.notes.push(note);
  }

  getNotes(): string[] {
    return this.notes;
  }

  clearNotes(): void {
    this.notes = [];
  }
}

export const notesService = new NotesService();
