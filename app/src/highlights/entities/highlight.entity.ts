import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Note } from "../../notes/entities/note.entity";
import { Label } from "../../labels/entities/label.entity";

@Entity("highlights")
export class Highlight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start: number;

  @Column()
  length: number;

  @Column({ nullable: true })
  comment?: string;

  @Column()
  noteId: number;

  @ManyToOne(() => Note, (note) => note.highlights, {
    onDelete: "CASCADE",
  })
  note: Note;

  @ManyToMany(() => Label, (label) => label.highlights)
  @JoinTable()
  labels: Label[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
