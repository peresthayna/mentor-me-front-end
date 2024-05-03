import { UsuarioRole } from "./usuario-role-enum.model";

export class UsuarioConsultaDTO {
  id: number;
  nome: string;
  email: string;
  senha: string;
  avatar: string;
  pontuacao: number;
  dataCadastro: Date;
  role: UsuarioRole;
  totalPublicacoes: number;
}
