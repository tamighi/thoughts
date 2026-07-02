import { labelsService } from "@/services/labelsService";
import { useQuery } from "@tanstack/react-query";

export const labelsKey = {
  all: ["labels"] as const,
};

export function useLabels() {
  return useQuery({
    queryKey: labelsKey.all,
    queryFn: labelsService.list,
  });
}
