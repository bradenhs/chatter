import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Calculation {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ type: "int", nullable: false })
  num1!: number;

  @Column({ type: "int", nullable: false })
  num2!: number;

  @Column({ type: "int", nullable: false })
  result!: number;
}
