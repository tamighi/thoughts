export const highlightsKeys = {
  all: ["highlights"] as const,
  detail: (id: number) => [...highlightsKeys.all, id] as const,
};
