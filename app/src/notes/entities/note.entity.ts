import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from "typeorm";
import { Label } from "../../labels/entities/label.entity";
import { Highlight } from "../../highlights/entities/highlight.entity";

@Entity("notes")
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("text")
  content: string;

  @ManyToMany(() => Label, (label) => label.notes)
  @JoinTable()
  labels: Label[];

  @OneToMany(() => Highlight, (highlight) => highlight.note)
  highlights: Highlight[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
