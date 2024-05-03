import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacaoConsultaDTO } from 'src/app/shared/models/publicacao-consulta-dto.model';
import { PublicacaoService } from 'src/app/shared/services/publicacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public menu: boolean = true;
  public params: HttpParams = new HttpParams();
  public publicacoes: PublicacaoConsultaDTO[] = [];
  public page: number = 0;
  public pageSize: number = 5;
  public hasNextPage: boolean = false;
  public total: number = 0;
  public busca: boolean = false;
  public publicacaoBuscada: string;

  constructor(
    private router: Router,
    private publicacaoService: PublicacaoService
  ) { }

  ngOnInit(): void {
  }

  public onOpenMenu(open: boolean): void {
    this.menu = open;
  }

  public getBusca(busca: string): void {
    this.busca = true;
    this.publicacaoBuscada = busca;
    this.params = new HttpParams().set('page',0).set('pageSize',5);
    this.publicacaoService.getPublicacoesBusca(this.params, busca).subscribe(publicacoes => {
      this.publicacoes = publicacoes.items;
      this.total = publicacoes.totalElements;
      this.hasNextPage = publicacoes.hasNext;
    })
  }

  public sairDaBusca(event): void {
    this.busca = false;
    this.publicacaoBuscada = '';
  }

}
