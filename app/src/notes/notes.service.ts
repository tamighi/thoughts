import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { Label } from "../labels/entities/label.entity";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { Note } from "./entities/note.entity";

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepo: Repository<Note>,

    @InjectRepository(Label)
    private readonly labelsRepo: Repository<Label>,
  ) {}

  async create(dto: CreateNoteDto) {
    const labels = dto.labelIds?.length
      ? await this.labelsRepo.findBy({ id: In(dto.labelIds) })
      : [];

    const note = this.notesRepo.create({
      title: dto.title,
      content: dto.content,
      labels,
    });

    return this.notesRepo.save(note);
  }

  findAll() {
    return this.notesRepo.find({
      relations: {
        labels: true,
        highlights: true,
      },
    });
  }

  findOne(id: number) {
    return this.notesRepo.findOne({
      where: { id },
      relations: {
        labels: true,
        highlights: true,
      },
    });
  }

  async update(id: number, dto: UpdateNoteDto) {
    const note = await this.notesRepo.findOne({
      where: { id },
      relations: {
        labels: true,
      },
    });

    if (!note) {
      throw new NotFoundException("Note not found");
    }

    if (dto.labelIds) {
      note.labels = await this.labelsRepo.findBy({
        id: In(dto.labelIds),
      });
    }

    Object.assign(note, {
      title: dto.title ?? note.title,
      content: dto.content ?? note.content,
    });

    return this.notesRepo.save(note);
  }

  async remove(id: number) {
    const note = await this.findOne(id);

    if (!note) {
      throw new NotFoundException("Note not found");
    }

    await this.notesRepo.remove(note);

    return { deleted: true };
  }
}
