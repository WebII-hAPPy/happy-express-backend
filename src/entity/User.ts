import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Analysis } from "./Analysis";

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

  @OneToMany(type => Analysis, analysis => analysis.user)
  analyses: Analysis[];
}
