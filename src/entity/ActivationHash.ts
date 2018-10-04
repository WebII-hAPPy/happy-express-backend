import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class ActivationHash {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @Column()
  userId: number;
}
