import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagConsultaDTO } from 'src/app/shared/models/tag-consulta-dto.model';
import { TagService } from 'src/app/shared/services/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  public menu: boolean = true;
  public tags: TagConsultaDTO[] = [];
  public total: number = 0;
  public selectedMostPopular: boolean = true;
  public selectedByNameAsc: boolean = false;
  public selectedByDate: boolean = false;
  public params: HttpParams = new HttpParams();
  public page: number = 0;
  public pageSize: number = 16;
  public hasNextPage: boolean = false;
  public carregandoRequisicao: boolean = false;

  constructor(
    private router: Router,
    private tagService: TagService
  ) { }

  ngOnInit(): void {
    this.getTagsPopularidade(this.page);
  }

  public getTagsPopularidade(page: number) {
    this.carregandoRequisicao = true;
    this.page = page;
    this.params = new HttpParams()
    .set('page', this.page)
    .set('pageSize', this.pageSize)
    this.tagService.getTagsOrdenadasPorQuantidadeDePublicacoes(this.params).subscribe(tags => {
      this.tags = tags.items;
      this.total = tags.totalElements;
      this.hasNextPage = tags.hasNext;
      this.carregandoRequisicao = false;
    });
  }

  public getTagsPorData(page: number) {
    this.carregandoRequisicao = true;
    this.page = page;
    this.params = new HttpParams()
    .set('page', this.page)
    .set('pageSize', this.pageSize)
    .set('ascending', false)
    .set('order', 'data');
    this.tagService.getTagsOrdenadasPorData(this.params).subscribe(tags => {
      this.tags = tags.items;
      this.total = tags.totalElements;
      this.hasNextPage = tags.hasNext;
      this.carregandoRequisicao = false;
    });
  }

  public getTagsPorNomeAsc(page: number) {
    this.carregandoRequisicao = true;
    this.page = page;
    this.params = new HttpParams()
    .set('page', this.page)
    .set('pageSize', this.pageSize)
    this.tagService.getTagsOrdenadasPorNome(this.params).subscribe(tags => {
      this.tags = tags.items;
      this.total = tags.totalElements;
      this.hasNextPage = tags.hasNext;
      this.carregandoRequisicao = false;
    });
  }

  public onOpenMenu(open: boolean): void {
    this.menu = open;
  }

  public getBusca(busca: string): void {
    this.router.navigate(['home']);
    alert(busca);
  }

  public onChangeFilter(filter: string): void {
    if(filter == 'popular') {
      this.selectedMostPopular = true;
      this.selectedByNameAsc = false;
      this.selectedByDate = false;
      this.getTagsPopularidade(this.page);
    } else if(filter == 'name') {
      this.selectedMostPopular = false;
      this.selectedByNameAsc = true;
      this.selectedByDate = false;
      this.getTagsPorNomeAsc(this.page);
    } else {
      this.selectedMostPopular = false;
      this.selectedByNameAsc = false;
      this.selectedByDate = true;
      this.getTagsPorData(this.page);
    }
  }

  public onSwitchPage(event): void {
    if(this.selectedMostPopular) {
      this.getTagsPopularidade(event.page)
    } else if(this.selectedByNameAsc) {
      this.getTagsPorNomeAsc(event.page)
    } else {
      this.getTagsPorData(event.page)
    }
  }

}
