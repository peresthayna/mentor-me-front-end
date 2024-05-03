import { HttpParams } from '@angular/common/http';
import { RespostaConsultaDTO } from './../../shared/models/resposta-consulta-dto.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicacaoConsultaDTO } from 'src/app/shared/models/publicacao-consulta-dto.model';
import { PublicacaoService } from 'src/app/shared/services/publicacao.service';
import { RespostaService } from 'src/app/shared/services/resposta.service';

@Component({
  selector: 'app-detalhes-publicacao',
  templateUrl: './detalhes-publicacao.component.html',
  styleUrls: ['./detalhes-publicacao.component.css']
})
export class DetalhesPublicacaoComponent implements OnInit {

  public menu: boolean = true;
  public idPublicacao: string;
  public publicacaoEscolhida: PublicacaoConsultaDTO;
  public page: number = 0;
  public hasNextPage: boolean;
  public total: number;
  public screenHeight: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private publicacaoService: PublicacaoService,
    private respostaService: RespostaService
  ) { }

  ngOnInit(): void {
    this.getIdParam();
    const divElement = document.getElementById('container')!;
    this.screenHeight = divElement.offsetHeight;
  }

  public onOpenMenu(open: boolean): void {
    this.menu = open;
  }

  public getBusca(busca: string): void {
    this.router.navigate(['home']);
    alert(busca);
  }

  public getIdParam(): void {
    this.idPublicacao = this.route.snapshot.paramMap.get('id')!;
    if(this.idPublicacao == null) {
      this.router.navigate(['home']);
    }
    this.getPublicacaoEscolhida();
  }

  public getPublicacaoEscolhida(): void {
    let params: HttpParams = new HttpParams();
    params
    .set('page', this.page)
    .set('pageSize', 5)
    .set('order', 'dataInicio');
    this.publicacaoService.getPublicacaoPorId(parseInt(this.idPublicacao)).subscribe(pub => {
      pub.publicacao = pub.publicacao.replace("<img","<br><img");
      this.respostaService.getRespostasPorPublicacao(params, pub.id).subscribe(respostas => {
        pub.respostas = respostas.items;
        this.hasNextPage = respostas.hasNext;
        this.total = respostas.totalElements;
        this.publicacaoEscolhida = pub;
      });
    });
  }
}
