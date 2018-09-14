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

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  analysisCount: number;

  @OneToMany((type) => Analysis, (analysis) => analysis.user)
  analyses: Analysis[];

  @BeforeInsert()
  async hashPasswordBeforeInsert(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
