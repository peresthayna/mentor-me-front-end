import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacaoConsultaDTO } from 'src/app/shared/models/publicacao-consulta-dto.model';
import { PublicacaoService } from 'src/app/shared/services/publicacao.service';

@Component({
  selector: 'app-pesquisa-publicacao',
  templateUrl: './pesquisa-publicacao.component.html',
  styleUrls: ['./pesquisa-publicacao.component.css']
})
export class PesquisaPublicacaoComponent implements OnInit {

  @Input() public publicacoes: PublicacaoConsultaDTO[] = [];
  @Input() public total: number = 0;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public onClickExibirDetalhesPublicacao(publicacaoEscolhida: PublicacaoConsultaDTO): void {
    this.router.navigate(['/home/pergunta/'+publicacaoEscolhida.id]);
  }

}
