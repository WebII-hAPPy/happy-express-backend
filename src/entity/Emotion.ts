import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Emotion {
  @PrimaryGeneratedColumn()
  id: number;

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
