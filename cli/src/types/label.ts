import type { Highlight } from "./highlight";
import type { Note } from "./note";

export interface Label {
  id: number;
  content: string;
  definition?: string;
  highlights?: Highlight[];
  notes?: Note[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLabelDto {
  content: string;
  definition?: string;
}

export interface UpdateLabelDto {
  content?: string;
  definition?: string;
}
