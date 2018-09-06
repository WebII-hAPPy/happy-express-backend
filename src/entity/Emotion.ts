import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Emotion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("double precision")
    anger: number;

    @Column("float")
    contempt: number;

    @Column("float")
    disgust: number;

    @Column("float")
    fear: number;

    @Column("float")
    happiness: number;

    @Column("float")
    neutral: number;

    @Column("float")
    sadness: number;

    @Column("float")
    surprise: number;

    @Column("float")
    smile: number;
    
}
