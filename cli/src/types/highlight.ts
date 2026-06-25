import type { ILabel } from "./label";
import type { INote } from "./note";

export interface IHighlight {
  id: number;
  start: number;
  length: number;
  comment?: string;
  noteId: number;
  note?: INote;
  labels?: ILabel[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateHighlightDto {
  start: number;
  length: number;
  comment?: string;
  noteId: number;
  labelIds?: number[];
}

export interface UpdateHighlightDto {
  start?: number;
  length?: number;
  comment?: string;
  noteId?: number;
  labelIds?: number[];
}
