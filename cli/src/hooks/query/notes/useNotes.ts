import { notesService } from "@/services/notesService";
import type { NotesQuery } from "@/types/note";
import { useQuery } from "@tanstack/react-query";
import { notesKeys } from "./notesKeys";

export const useNotes = (query: NotesQuery) => {
  return useQuery({
    queryKey: notesKeys.list(query),
    queryFn: () => notesService.list(query),
  });
};
