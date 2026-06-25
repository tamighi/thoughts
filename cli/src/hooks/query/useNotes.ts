import { notesService } from "@/services/notesService";
import { useQuery } from "@tanstack/react-query";

export const notesKeys = {
  all: ["notes"] as const,
};

export function useNotes() {
  return useQuery({
    queryKey: notesKeys.all,
    queryFn: notesService.list,
  });
}
