import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Analysis } from "./Analysis";

@Entity()
export class FacialHair {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne((type) => Analysis, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  @JoinColumn()
  analysis: Analysis;

  @Column("double precision")
  moustache: number;

  @Column("double precision")
  beard: number;

  @Column("double precision")
  sideburns: number;
}
