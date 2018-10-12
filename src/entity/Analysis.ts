import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn
} from "typeorm";
import { Accessory } from "./Accessory";
import { Emotion } from "./Emotion";
import { FacialHair } from "./FacialHair";
import { Hair } from "./Hair";
import { MakeUp } from "./MakeUp";
import { User } from "./User";

@Entity()
export class Analysis {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne((type) => User, (user) => user.analyses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  user: User;

  @Column("date")
  time: Date;

  @OneToOne((type) => Emotion, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  emotion: Emotion;

  @Column("double precision")
  smile: number;

  @OneToMany((type) => Accessory, (accessory) => accessory.analysis, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  accessories: Accessory[];

  @OneToOne((type) => MakeUp, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  makeUp: MakeUp;

  @Column()
  glasses: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @OneToOne((type) => FacialHair, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  facialHair: FacialHair;

  @OneToOne((type) => Hair, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  hair: Hair;
}
