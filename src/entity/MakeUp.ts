import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MakeUp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eyeMakeUp: boolean;

  @Column()
  lipMakeUp: boolean;
}
