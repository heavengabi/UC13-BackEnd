import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Jogador } from "./Jogador";

@Entity("selecoes")
export class Selecao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column({ length: 100, nullable: false })
  pais: string;

  @Column({ length: 100, nullable: false })
  tecnico: string;

  @Column({ nullable: false })
  rankingFifa: number;

  @Column({ nullable: false })
  anoFundacao: number;

  @OneToMany(() => Jogador, (jogador) => jogador.selecao)
  jogadores: Jogador[];
}
