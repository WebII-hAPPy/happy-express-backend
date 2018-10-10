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
  id: number;

  @ManyToOne((type) => User, (user) => user.analyses)
  user: User;

  @Column("date")
  time: Date;

  @OneToOne((type) => Emotion)
  emotion: Emotion;

  @Column("double precision")
  smile: number;

  @OneToMany((type) => Accessory, (accessory) => accessory.analysis)
  accessories: Accessory[];

  @OneToOne((type) => MakeUp)
  makeUp: MakeUp;

  @Column()
  glasses: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @OneToOne((type) => FacialHair)
  facialHair: FacialHair;

  @OneToOne((type) => Hair)
  hair: Hair;
}
