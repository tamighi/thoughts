import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { Label } from "../labels/entities/label.entity";
import { Note } from "../notes/entities/note.entity";
import { CreateHighlightDto } from "./dto/create-highlight.dto";
import { UpdateHighlightDto } from "./dto/update-highlight.dto";
import { Highlight } from "./entities/highlight.entity";

@Injectable()
export class HighlightsService {
  constructor(
    @InjectRepository(Highlight)
    private readonly highlightsRepo: Repository<Highlight>,

    @InjectRepository(Note)
    private readonly notesRepo: Repository<Note>,

    @InjectRepository(Label)
    private readonly labelsRepo: Repository<Label>,
  ) {}

  async create(dto: CreateHighlightDto) {
    const note = await this.notesRepo.findOneBy({ id: dto.noteId });

    if (!note) {
      throw new NotFoundException("Note not found");
    }

    const labels = dto.labelIds?.length
      ? await this.labelsRepo.findBy({ id: In(dto.labelIds) })
      : [];

    const highlight = this.highlightsRepo.create({
      start: dto.start,
      length: dto.length,
      comment: dto.comment,
      note,
      noteId: note.id,
      labels,
    });

    return this.highlightsRepo.save(highlight);
  }

  findAll() {
    return this.highlightsRepo.find({
      relations: {
        note: true,
        labels: true,
      },
    });
  }

  findOne(id: number) {
    return this.highlightsRepo.findOne({
      where: { id },
      relations: {
        note: true,
        labels: true,
      },
    });
  }

  async update(id: number, dto: UpdateHighlightDto) {
    const highlight = await this.highlightsRepo.findOne({
      where: { id },
      relations: {
        note: true,
        labels: true,
      },
    });

    if (!highlight) {
      throw new NotFoundException("Highlight not found");
    }

    if (dto.noteId) {
      const note = await this.notesRepo.findOneBy({ id: dto.noteId });

      if (!note) {
        throw new NotFoundException("Note not found");
      }

      highlight.note = note;
      highlight.noteId = note.id;
    }

    if (dto.labelIds) {
      highlight.labels = await this.labelsRepo.findBy({
        id: In(dto.labelIds),
      });
    }

    Object.assign(highlight, {
      start: dto.start ?? highlight.start,
      length: dto.length ?? highlight.length,
      comment: dto.comment ?? highlight.comment,
    });

    return this.highlightsRepo.save(highlight);
  }

  async remove(id: number) {
    const highlight = await this.findOne(id);

    if (!highlight) {
      throw new NotFoundException("Highlight not found");
    }

    await this.highlightsRepo.remove(highlight);

    return { deleted: true };
  }
}
