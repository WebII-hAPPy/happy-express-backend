import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ActivationHash {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  hash: string;

  @Column()
  userId: number;
}
