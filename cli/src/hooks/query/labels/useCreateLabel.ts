import { labelsService } from "@/services/labelsService";
import type { CreateLabelDto } from "@/types/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { labelsKey } from "./labelsKey";

export const useCreateLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateLabelDto) => labelsService.create(dto),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: labelsKey.all }),
  });
};
