import { useMutation, useQueryClient } from "@tanstack/react-query";
import { highlightsService } from "@/services/highlightsService";
import { notesKeys } from "@/hooks/query/notes/notesKeys";
import type { CreateHighlightDto } from "@/types/highlight";
import { highlightsKeys } from "./highlightsKeys";

export function useCreateHighlight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateHighlightDto) => highlightsService.create(dto),

    onSuccess: (_, dto) => {
      queryClient.invalidateQueries({
        queryKey: notesKeys.detail(dto.noteId),
      });

      queryClient.invalidateQueries({
        queryKey: notesKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: highlightsKeys.all,
      });
    },
  });
}
