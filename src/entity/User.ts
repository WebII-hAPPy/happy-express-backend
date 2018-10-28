import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { ActivationHash } from "./ActivationHash";
import { Analysis } from "./Analysis";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    default: false
  })
  active: boolean;

  @Column()
  name: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    default: 0
  })
  analysisCount: number;

  @OneToOne((type) => ActivationHash, {
    cascade: true
  })
  activationHash: ActivationHash;

  @OneToMany((type) => Analysis, (analysis) => analysis.user, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  analyses: Analysis[];

  @Column({
    default: false
  })
  passwordReset: boolean;
}
