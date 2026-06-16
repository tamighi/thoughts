import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  create(dto: CreateNoteDto) {
    const note = this.noteRepository.create(dto);
    return this.noteRepository.save(note);
  }

  findAll() {
    return this.noteRepository.find();
  }

  findOne(id: number) {
    return this.noteRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateNoteDto) {
    await this.noteRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.noteRepository.delete(id);
  }
}
