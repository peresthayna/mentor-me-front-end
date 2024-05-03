export class TagConsultaDTO {
  id: number;
  nome: string;
  data: Date;
  numeroPublicacoes: number;

  constructor(nome: string, id?: number) {
    this.nome = nome;
    if(id) {
      this.id = id;
    }
  }
}
