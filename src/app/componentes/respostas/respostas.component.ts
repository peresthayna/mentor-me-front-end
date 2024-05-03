import { Component, OnInit, Input } from '@angular/core';
import { PublicacaoConsultaDTO } from 'src/app/shared/models/publicacao-consulta-dto.model';
import { RespostaConsultaDTO } from 'src/app/shared/models/resposta-consulta-dto.model';
import { UsuarioConsultaDTO } from 'src/app/shared/models/usuario-consulta.dto.model';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-respostas',
  templateUrl: './respostas.component.html',
  styleUrls: ['./respostas.component.css']
})
export class RespostasComponent implements OnInit {

  @Input() public respostas: RespostaConsultaDTO[] = [];
  public usuario: UsuarioConsultaDTO = new UsuarioConsultaDTO();

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarioPorId(this.respostas[0].idUsuario).subscribe(usuario => this.usuario = usuario);
  }

}
