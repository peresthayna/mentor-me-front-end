import { PublicacaoTagCadastroDTO } from "./publicacao-tag-cadastro-dto.model";

export class PublicacaoCadastroDTO {
  idUsuario: number;
  titulo: string;
  publicacao: string;
  dataInicio: Date;
  visualizacoes: number;
  publicacaoTags: PublicacaoTagCadastroDTO[] = [];
}
