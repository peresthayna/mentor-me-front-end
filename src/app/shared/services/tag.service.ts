import { TagCadastroDTO } from './../models/tag-cadastro-dto.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagConsultaDTO } from '../models/tag-consulta-dto.model';
import { PageResponseDTO } from '../models/page-response-dto.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private readonly URL: string = 'http://127.0.0.1:8080/tag';

  constructor(private http: HttpClient) { }

  public getTagsOrdenadasPorData(params: HttpParams): Observable<PageResponseDTO<TagConsultaDTO>> {
    return this.http.get<PageResponseDTO<TagConsultaDTO>>(this.URL,{params});
  }

  public getTagsOrdenadasPorNome(params: HttpParams): Observable<PageResponseDTO<TagConsultaDTO>> {
    return this.http.get<PageResponseDTO<TagConsultaDTO>>(this.URL + '/nome-asc',{params});
  }

  public getTagsOrdenadasPorQuantidadeDePublicacoes(params: HttpParams): Observable<PageResponseDTO<TagConsultaDTO>> {
    return this.http.get<PageResponseDTO<TagConsultaDTO>>(this.URL + '/popularidade',{params});
  }

  public getTagsPorNome(nome: string): Observable<TagConsultaDTO[]> {
    return this.http.get<TagConsultaDTO[]>(this.URL + '/pesquisa/' + nome);
  }

  public getTagPorId(id: number): Observable<TagConsultaDTO> {
    return this.http.get<TagConsultaDTO>(this.URL + '/' + id);
  }

  public cadastrar(tagCadastro: TagCadastroDTO): Observable<TagConsultaDTO> {
    return this.http.post<TagConsultaDTO>(this.URL, tagCadastro);
  }

  public atualizar(idTag: number, tagCadastro: TagCadastroDTO): Observable<void> {
    return this.http.put<void>(this.URL + '/' + idTag, tagCadastro);
  }

}
