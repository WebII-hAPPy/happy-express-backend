import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Analysis } from "./Analysis";
import { HairColor } from "./HairColor";

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
