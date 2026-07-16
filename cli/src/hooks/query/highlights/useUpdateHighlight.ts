import { notesKeys } from "@/hooks/query/notes/notesKeys";
import { highlightsService } from "@/services/highlightsService";
import type { Highlight, UpdateHighlightDto } from "@/types/highlight";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { highlightsKeys } from "./highlightsKeys";

interface UpdateHighlightVariables {
  id: number;
  dto: UpdateHighlightDto;
}

export function useUpdateHighlight() {
  const queryClient = useQueryClient();

  return useMutation<Highlight, Error, UpdateHighlightVariables>({
    mutationFn: ({ id, dto }) => highlightsService.update(id, dto),

    onSuccess: (highlight, variables) => {
      queryClient.setQueryData(highlightsKeys.detail(highlight.id), highlight);

      queryClient.invalidateQueries({
        queryKey: notesKeys.detail(variables.dto.noteId!),
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
