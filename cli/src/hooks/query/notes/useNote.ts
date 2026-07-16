import { useQuery } from "@tanstack/react-query";
import { notesService } from "@/services/notesService";
import { notesKeys } from "./notesKeys";

export function useNote(id: number) {
  return useQuery({
    queryKey: notesKeys.detail(id),
    queryFn: () => notesService.findOne(id),
  });
}
