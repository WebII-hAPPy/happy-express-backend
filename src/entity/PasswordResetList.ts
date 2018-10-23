import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class PasswordResetList {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  resetingPassword: boolean;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;
}
