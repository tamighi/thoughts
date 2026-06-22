import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Label } from "../labels/entities/label.entity";
import { Note } from "../notes/entities/note.entity";
import { Highlight } from "./entities/highlight.entity";
import { HighlightsController } from "./highlights.controller";
import { HighlightsService } from "./highlights.service";

@Module({
  imports: [TypeOrmModule.forFeature([Highlight, Note, Label])],
  controllers: [HighlightsController],
  providers: [HighlightsService],
  exports: [HighlightsService],
})
export class HighlightsModule {}
