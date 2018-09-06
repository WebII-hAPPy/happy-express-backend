import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Statistic {
  @PrimaryGeneratedColumn()
  id: number;
}
