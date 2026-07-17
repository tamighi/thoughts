import { useMutation, useQueryClient } from "@tanstack/react-query";
import { highlightsService } from "@/services/highlightsService";
import { notesKeys } from "@/hooks/query/notes/notesKeys";
import { highlightsKeys } from "./highlightsKeys";

type DeleteHighlightVariables = {
  id: number;
  noteId: number;
};

export function useDeleteHighlight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DeleteHighlightVariables) =>
      highlightsService.delete(id),

    onSuccess: (_, { noteId }) => {
      queryClient.invalidateQueries({
        queryKey: notesKeys.detail(noteId),
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
