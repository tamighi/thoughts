import type { Highlight } from "./highlight";
import type { Label } from "./label";
import type { PaginationQuery } from "./pagination";

export interface Note {
  id: number;
  title: string;
  content: string;
  labels: Label[];
  highlights: Highlight[];
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

export interface NotesQuery extends PaginationQuery {
  title?: string;
}
