import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
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

  @OneToOne((type) => Emotion, (emotion) => emotion.analysis, {
    cascade: true,
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

  @OneToOne((type) => MakeUp, (makeUp) => makeUp.analysis, {
    cascade: true,
    onUpdate: "CASCADE"
  })
  makeUp: MakeUp;

  @Column()
  glasses: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @OneToOne((type) => FacialHair, (facialHair) => facialHair.analysis, {
    cascade: true,
    onUpdate: "CASCADE"
  })
  facialHair: FacialHair;

  @OneToOne((type) => Hair, (hair) => hair.analysis, {
    cascade: true,
    onUpdate: "CASCADE"
  })
  hair: Hair;
}
