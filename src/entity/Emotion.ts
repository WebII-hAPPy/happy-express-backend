import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Analysis } from "./Analysis";

@Entity()
export class Emotion {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne((type) => Analysis, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  @JoinColumn()
  analysis: Analysis;

  @Column("double precision")
  anger: number;

  @Column("double precision")
  contempt: number;

  @Column("double precision")
  disgust: number;

  @Column("double precision")
  fear: number;

  @Column("double precision")
  happiness: number;

  @Column("double precision")
  neutral: number;

  @Column("double precision")
  sadness: number;

  @Column("double precision")
  surprise: number;
}
