import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hair } from "./Hair";

@Entity()
export class HairColor {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  color: string;

  @Column("double precision")
  confidence: number;

  @ManyToOne((type) => Hair, (hair) => hair.hairColor)
  hair: Hair;
}
