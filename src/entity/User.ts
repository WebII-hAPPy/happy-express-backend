import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Analysis } from "./Analysis";
import { ActivationHash } from "./ActivationHash";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    default: false
  })
  active: boolean;

  // @OneToOne((type) => ActivationHash)
  // hash: ActivationHash;

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
}
