import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { HairColor } from "./HairColor";

@Entity()
export class Hair {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("double precision")
  bald: number;

  @Column()
  invisible: boolean;

  @OneToMany(type => HairColor, hairColor => hairColor.hair)
  hairColor: HairColor[];
}
