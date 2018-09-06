import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Analysis } from "./Analysis";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    analysisCount: number;

    @OneToMany(type => Analysis, analysis => analysis.user)
    analyses: Analysis[];

}
