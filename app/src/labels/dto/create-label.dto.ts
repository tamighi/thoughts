import { IsOptional, IsString } from "class-validator";

export class CreateLabelDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  definition?: string;
}
