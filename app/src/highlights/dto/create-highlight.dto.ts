export class CreateHighlightDto {
  start: number;
  length: number;
  comment?: string;
  noteId: number;
  labelIds?: number[];
}
