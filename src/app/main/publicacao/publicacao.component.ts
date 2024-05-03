import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacaoConsultaDTO } from 'src/app/shared/models/publicacao-consulta-dto.model';
import { PublicacaoService } from 'src/app/shared/services/publicacao.service';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.component.html',
  styleUrls: ['./publicacao.component.css']
})
export class PublicacaoComponent implements OnInit {

  public publicacoes: PublicacaoConsultaDTO[] = [];
  public total: number = 0;
  public selectedMostRecent: boolean = true;
  public selectedMostOld: boolean = false;
  public selectedWithoutAnswer: boolean = false;
  public params: HttpParams = new HttpParams();
  public page: number = 0;
  public pageSize: number = 5;
  public hasNextPage: boolean = false;
  public carregandoRequisicao: boolean = false;

  constructor(
    private publicacaoService: PublicacaoService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPublicacoesOrdenadasPorDataMaisRecente(this.page);
  }

  public getPublicacoesOrdenadasPorDataMaisRecente(page: number): void {
    this.carregandoRequisicao = true;
    this.page = page;
    this.params = new HttpParams()
    .set('page', this.page)
    .set('pageSize', this.pageSize)
    .set('ascending', false)
    .set('order', 'dataInicio');
    this.publicacaoService.getPublicacoesOrdenadasPorData(this.params).subscribe(publicacoes => {
      this.publicacoes = publicacoes.items;
      this.hasNextPage = publicacoes.hasNext;
      this.total = publicacoes.totalElements;
      this.carregandoRequisicao = false;
    })
  }

  public getPublicacoesOrdenadasPorDataMaisAntiga(page: number): void {
    this.carregandoRequisicao = true;
    this.page = page;
    this.params = new HttpParams()
    .set('page', this.page)
    .set('pageSize', this.pageSize)
    .set('order', 'dataInicio');
    this.publicacaoService.getPublicacoesOrdenadasPorData(this.params).subscribe(publicacoes => {
      this.publicacoes = publicacoes.items;
      this.hasNextPage = publicacoes.hasNext;
      this.total = publicacoes.totalElements;
      this.carregandoRequisicao = false;
    })
  }

  public onChangeFilter(filter: string): void {
    if(filter == 'recent') {
      this.selectedMostRecent = true;
      this.selectedMostOld = false;
      this.selectedWithoutAnswer = false;
      this.getPublicacoesOrdenadasPorDataMaisRecente(this.page);
    } else if(filter == 'old') {
      this.selectedMostRecent = false;
      this.selectedMostOld = true;
      this.selectedWithoutAnswer = false;
      this.getPublicacoesOrdenadasPorDataMaisAntiga(this.page);
    } else {
      this.selectedMostRecent = false;
      this.selectedMostOld = false;
      this.selectedWithoutAnswer = true;
    }
  }

  public onClickAdicionarPergunta(): void {
    this.router.navigate(['/home/nova-pergunta']);
  }

  public onClickExibirDetalhesPublicacao(publicacaoEscolhida: PublicacaoConsultaDTO): void {
    this.router.navigate(['/home/pergunta/'+publicacaoEscolhida.id]);
  }

  public onSwitchPage(event): void {
    if(this.selectedMostRecent) {
      this.getPublicacoesOrdenadasPorDataMaisRecente(event.page);
    } else if(this.selectedMostOld) {
      this.getPublicacoesOrdenadasPorDataMaisAntiga(event.page);
    } else {

    }
  }

}
