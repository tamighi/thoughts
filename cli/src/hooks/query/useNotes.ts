import type { NotesQuery } from "@/types/note";
import { notesService } from "@/services/notesService";
import { useQuery } from "@tanstack/react-query";

export const notesKeys = {
  all: ["notes"] as const,
  list: (query: NotesQuery) => [...notesKeys.all, query] as const,
};

export function useNotes(query: NotesQuery) {
  return useQuery({
    queryKey: notesKeys.list(query),
    queryFn: () => notesService.list(query),
  });
}
