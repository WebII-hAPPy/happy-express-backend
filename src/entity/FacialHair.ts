import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class FacialHair {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("double precision")
  moustache: number;

  @Column("double precision")
  beard: number;

  @Column("double precision")
  sideburns: number;
}
