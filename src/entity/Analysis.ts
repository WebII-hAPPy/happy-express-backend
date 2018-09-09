import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
  Timestamp
} from "typeorm";
import { Emotion } from "./Emotion";
import { Accessory } from "./Accessory";
import { User } from "./User";
import { MakeUp } from "./MakeUp";
import { FacialHair } from "./FacialHair";
import { Hair } from "./Hair";

@Entity()
export class Analysis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @ManyToOne(type => User, user => user.analyses)
  user: User;

  @Column("timestamp")
  time: string;

  @OneToOne(type => Emotion)
  @JoinColumn()
  emotion: Emotion;

  @Column()
  smile: number;

  @OneToMany(type => Accessory, accessory => accessory.analysis)
  accessories: Accessory[];

  @OneToOne(type => MakeUp)
  @JoinColumn()
  makeUp: MakeUp;

  @Column()
  glasses: string;

  @Column()
  gender: string;

  @Column()
  age: string;

  @OneToOne(type => FacialHair)
  facialHair: FacialHair;

  @OneToOne(type => Hair)
  hair: Hair;
}
