import { labelsService } from "@/services/labelsService";
import { useQuery } from "@tanstack/react-query";
import { labelsKey } from "./labelsKey";

export const useLabels = () => {
  return useQuery({
    queryKey: labelsKey.all,
    queryFn: () => labelsService.list(),
  });
};
