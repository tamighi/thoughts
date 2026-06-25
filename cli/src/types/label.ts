import type { IHighlight } from "./highlight";
import type { INote } from "./note";

export interface ILabel {
  id: number;
  content: string;
  definition?: string;
  highlights?: IHighlight[];
  notes?: INote[];
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
