import { labelsService } from "@/services/labelsService";
import { useQuery } from "@tanstack/react-query";
import { labelsKeys } from "./labelsKeys";

export const useLabels = () => {
  return useQuery({
    queryKey: labelsKeys.all,
    queryFn: () => labelsService.list(),
  });
};
