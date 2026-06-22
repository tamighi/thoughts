import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Label } from "./entities/label.entity";
import { CreateLabelDto } from "./dto/create-label.dto";
import { UpdateLabelDto } from "./dto/update-label.dto";

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private readonly labelsRepo: Repository<Label>,
  ) {}

  create(dto: CreateLabelDto) {
    const label = this.labelsRepo.create(dto);
    return this.labelsRepo.save(label);
  }

  findAll() {
    return this.labelsRepo.find({
      relations: {
        notes: true,
        highlights: true,
      },
    });
  }

  findOne(id: number) {
    return this.labelsRepo.findOne({
      where: { id },
      relations: {
        notes: true,
        highlights: true,
      },
    });
  }

  async update(id: number, dto: UpdateLabelDto) {
    const label = await this.findOne(id);

    if (!label) {
      throw new NotFoundException("Label not found");
    }

    Object.assign(label, dto);

    return this.labelsRepo.save(label);
  }

  async remove(id: number) {
    const label = await this.findOne(id);

    if (!label) {
      throw new NotFoundException("Label not found");
    }

    await this.labelsRepo.remove(label);

    return { deleted: true };
  }
}
