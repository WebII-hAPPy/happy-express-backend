import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Statistic {
  @PrimaryGeneratedColumn()
  id: number;
}
