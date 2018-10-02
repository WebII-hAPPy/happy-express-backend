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

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;
}
