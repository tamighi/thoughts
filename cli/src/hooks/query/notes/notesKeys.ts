export const notesKeys = {
  all: ["notes"] as const,
  list: (query: object) => [...notesKeys.all, query] as const,
};
