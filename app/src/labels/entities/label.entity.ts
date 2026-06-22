import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm";
import { Highlight } from "src/highlights/entities/highlight.entity";
import { Note } from "src/notes/entities/note.entity";

@Entity("labels")
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  definition?: string;

  @ManyToMany(() => Highlight, (highlight) => highlight.labels)
  highlights: Highlight[];

  @ManyToMany(() => Note, (note) => note.labels)
  notes: Note[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
