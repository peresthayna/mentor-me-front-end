import { UsuarioRole } from "./usuario-role-enum.model";

export class UsuarioCadastroDTO {
  id: number;
  email: string;
  nome: string;
  senha: string;
  avatar: string;
}
