import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Selecao } from "./Selecao";

//sinalizar ao typeorm que essa classe vai ser mapeada em uma tabela, utilizamos um decorator pra isto

@Entity("jogadores")
export class Jogador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ nullable: false })
  numeroCamisa: number;

  @Column({ length: 100, nullable: false })
  posicao: string;

  @Column({ nullable: false })
  idade: number;

  @Column({ nullable: false })
  peso: number;

  @Column({ nullable: false })
  gols: number;

  @ManyToOne(() => Selecao, (selecao) => selecao.jogadores)
  selecao: Selecao;
}
