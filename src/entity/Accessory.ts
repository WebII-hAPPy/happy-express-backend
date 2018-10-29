import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";
import { Analysis } from "./Analysis";

@Entity()
export class Accessory {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  type: string;

  @Column("float")
  confidence: number;

  @OneToOne((type) => Analysis, (analysis) => analysis.accessories, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  @JoinColumn()
  analysis: Analysis;
}
