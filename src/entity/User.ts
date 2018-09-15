import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BeforeInsert
} from "typeorm";
import { Analysis } from "./Analysis";
import * as bcrypt from "bcrypt";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToMany((type) => Analysis, (analysis) => analysis.user)
  analyses: Analysis[];
}
