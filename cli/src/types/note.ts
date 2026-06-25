import type { IHighlight } from "./highlight";
import type { ILabel } from "./label";

export interface INote {
  id: number;
  title: string;
  content: string;
  labels?: ILabel[];
  highlights?: IHighlight[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNoteDto {
  title: string;
  content: string;
  labelIds?: number[];
}

export interface UpdateNoteDto {
  title?: string;
  content?: string;
  labelIds?: number[];
}
