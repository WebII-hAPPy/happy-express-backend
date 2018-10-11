import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Analysis } from "./Analysis";

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

  @OneToMany((type) => Analysis, (analysis) => analysis.user, {
    cascade: true
  })
  analyses: Analysis[];
}
