import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from "typeorm";
import { HairColor } from "./HairColor";
import { Analysis } from "./Analysis";

@Entity()
export class Hair {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne((type) => Analysis, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  @JoinColumn()
  analysis: Analysis;

  @Column("double precision")
  bald: number;

  @Column()
  invisible: boolean;

  @OneToMany((type) => HairColor, (hairColor) => hairColor.hair, {
    cascade: true
  })
  hairColor: HairColor[];
}
