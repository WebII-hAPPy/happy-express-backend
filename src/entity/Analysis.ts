import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToOne, OneToMany, JoinColumn, Timestamp} from "typeorm";
import {Emotion} from "./Emotion";
import { Accessory } from "./Accessory";
import { User } from "./User";

@Entity()
export class Analysis {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("timestamp")
    time: Timestamp;

    @OneToOne(type => Emotion)
    @JoinColumn()
    emotion: Emotion;

    @OneToMany(type => Accessory, accessory => accessory.analysis)
    accessories: Accessory[];   
    
    @ManyToOne(type => User, user => user.analyses)
    user: User;

}
