import { PublicacaoCadastroDTO } from './../models/publicacao-cadastro-dto.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicacaoConsultaDTO } from '../models/publicacao-consulta-dto.model';
import { PageResponseDTO } from '../models/page-response-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService {

  private readonly URL: string = 'http://127.0.0.1:8080/publicacao';

  constructor(private http: HttpClient) { }

  public getPublicacoesOrdenadasPorData(params: HttpParams): Observable<PageResponseDTO<PublicacaoConsultaDTO>> {
    return this.http.get<PageResponseDTO<PublicacaoConsultaDTO>>(this.URL,{params});
  }

  public getPublicacoesPageableTeste(params: HttpParams): Observable<PageResponseDTO<PublicacaoConsultaDTO>> {
    return this.http.get<PageResponseDTO<PublicacaoConsultaDTO>>(this.URL+'/teste',{params});
  }

  public getPublicacoesBusca(params: HttpParams, publicacao: string): Observable<PageResponseDTO<PublicacaoConsultaDTO>> {
    return this.http.get<PageResponseDTO<PublicacaoConsultaDTO>>(`${this.URL}/pesquisa/${publicacao}`,{params});
  }

  public getPublicacaoPorId(idPublicacao: number): Observable<PublicacaoConsultaDTO> {
    return this.http.get<PublicacaoConsultaDTO>(this.URL+'/'+idPublicacao);
  }

  public cadastrarPublicacao(publicacao: PublicacaoCadastroDTO): Observable<void> {
    return this.http.post<void>(this.URL, publicacao);
  }

  public atualizarPublicacao(id: number, publicacao: PublicacaoCadastroDTO): Observable<void> {
    return this.http.put<void>(this.URL+'/'+id, publicacao);
  }

  public deletarPublicacao(id: number): void {
    this.http.delete<PublicacaoConsultaDTO>(this.URL+'/'+id);
  }
}
