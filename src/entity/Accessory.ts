import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Analysis } from "./Analysis";

@Entity()
export class Accessory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column("float")
    confidence: number;

    @ManyToOne(type => Analysis, analysis => analysis.accessories)
    analysis: Analysis;

}
