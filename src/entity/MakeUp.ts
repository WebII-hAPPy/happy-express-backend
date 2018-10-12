import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Analysis } from "./Analysis";

@Entity()
export class MakeUp {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne((type) => Analysis, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  @JoinColumn()
  analysis: Analysis;

  @Column()
  eyeMakeup: boolean;

  @Column()
  lipMakeup: boolean;
}
