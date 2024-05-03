import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponseDTO } from '../models/page-response-dto.model';
import { RespostaConsultaDTO } from '../models/resposta-consulta-dto.model';
import { RespostaCadastroDTO } from '../models/resposta-cadastro-dto.model';
import { PublicacaoConsultaDTO } from '../models/publicacao-consulta-dto.model';

@Injectable({
  providedIn: 'root'
})
export class RespostaService {

  private readonly URL: string = 'http://127.0.0.1:8080/resposta';

  constructor(private http: HttpClient) { }

  public getRespostasPorPublicacao(params: HttpParams, idPublicacao: number): Observable<PageResponseDTO<RespostaConsultaDTO>> {
    return this.http.get<PageResponseDTO<RespostaConsultaDTO>>(this.URL+'/publicacao/'+idPublicacao,{params});
  }

  public getRespostaPorId(id: number): Observable<RespostaConsultaDTO> {
    return this.http.get<RespostaConsultaDTO>(this.URL+'/'+id);
  }

  public cadastrarResposta(resposta: RespostaCadastroDTO): Observable<void> {
    return this.http.post<void>(this.URL, resposta);
  }

  public atualizarResposta(id: number, resposta: RespostaCadastroDTO): Observable<void> {
    return this.http.put<void>(this.URL+'/'+id, resposta);
  }

  public deletarResposta(id: number): void {
    this.http.delete<void>(this.URL+'/'+id);
  }
}
