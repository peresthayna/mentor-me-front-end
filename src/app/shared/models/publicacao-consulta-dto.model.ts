import { RespostaConsultaDTO } from './resposta-consulta-dto.model';
import { PublicacaoTagConsultaDTO } from './publicacao-tag-consulta-dto.model';
import { UsuarioConsultaDTO } from './usuario-consulta.dto.model';
export class PublicacaoConsultaDTO {
  id: number;
  usuario: UsuarioConsultaDTO;
  titulo: string;
  publicacao: string;
  dataInicio: Date;
  dataFim?: Date;
  visualizacoes: number;
  publicacaoTags: PublicacaoTagConsultaDTO[] = [];
  quantoTempoFoiPostado: string;
  respostas: RespostaConsultaDTO[] = [];
}
