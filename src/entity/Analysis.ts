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

  @ManyToOne((type) => User, (user) => user.analyses)
  user: User;

  @Column("date")
  time: Date;

  @OneToOne((type) => Emotion, {
    cascade: true
  })
  @JoinColumn()
  emotion: Emotion;

  @Column("double precision")
  smile: number;

  @OneToMany((type) => Accessory, (accessory) => accessory.analysis, {
    cascade: true
  })
  accessories: Accessory[];

  @OneToOne((type) => MakeUp, {
    cascade: true
  })
  @JoinColumn()
  makeUp: MakeUp;

  @Column()
  glasses: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @OneToOne((type) => FacialHair, {
    cascade: true
  })
  @JoinColumn()
  facialHair: FacialHair;

  @OneToOne((type) => Hair, {
    cascade: true
  })
  @JoinColumn()
  hair: Hair;
}
