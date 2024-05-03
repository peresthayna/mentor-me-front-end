import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioCadastroDTO } from '../models/usuario-cadastro-dto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private readonly URL: string = 'http://127.0.0.1:8080/auth/cadastro';

  constructor(private http: HttpClient) { }

  public cadastrarUsuario(usuario: UsuarioCadastroDTO): Observable<string> {
    return this.http.post<string>(this.URL, usuario);
  }
}
