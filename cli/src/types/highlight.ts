import type { Label } from "./label";
import type { Note } from "./note";

export interface Highlight {
  id: number;
  start: number;
  length: number;
  comment?: string;
  noteId: number;
  note?: Note;
  labels?: Label[];
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
