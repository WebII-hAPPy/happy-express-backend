import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MakeUp {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  eyeMakeup: boolean;

  @Column()
  lipMakeup: boolean;
}
