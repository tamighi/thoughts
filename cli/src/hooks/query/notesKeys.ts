import type { NotesQuery } from "@/types/note";

export const notesKeys = {
  all: ["notes"] as const,
  list: (query: NotesQuery) => [...notesKeys.all, query] as const,
};
