import { useMutation, useQueryClient } from "@tanstack/react-query";
import { labelsService } from "@/services/labelsService";
import { labelsKeys } from "./labelsKeys";

export function useDeleteLabel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => labelsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: labelsKeys.all,
      });
    },
  });
}
