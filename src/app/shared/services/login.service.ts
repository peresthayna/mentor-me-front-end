import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioConsultaDTO } from '../models/usuario-consulta.dto.model';
import { tap } from 'rxjs/operators';
import { UsuarioCadastroDTO } from '../models/usuario-cadastro-dto.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly URL: string = 'http://127.0.0.1:8080/auth/login';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public logar(usuario: UsuarioConsultaDTO): Observable<any> {
    return this.http.post<any>(this.URL, usuario).pipe(
      tap((resposta) => {
        console.log(resposta)
        localStorage.setItem('token', btoa(JSON.stringify(resposta['token'])));
        localStorage.setItem('usuario', btoa(JSON.stringify(resposta['usuario'])));
        this.router.navigate(['home']);
      }));
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get obterUsuarioLogado(): UsuarioConsultaDTO {
    return localStorage.getItem('usuario')
      ? JSON.parse(atob(localStorage.getItem('usuario')!))
      : null;
  }

  get obterIdUsuarioLogado(): number | null {
    return localStorage.getItem('usuario')
      ? (JSON.parse(atob(localStorage.getItem('usuario')!)) as UsuarioConsultaDTO).id
      : null;
  }

  get obterTokenUsuario(): string {
    return localStorage.getItem('token')
      ? JSON.parse(atob(localStorage.getItem('token')!))
      : null;
  }

  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  public convertCadastrotoConsultaDTO(usuarioCadastro: UsuarioCadastroDTO): UsuarioConsultaDTO {
    const usuario: UsuarioConsultaDTO = new UsuarioConsultaDTO();
    usuario.email = usuarioCadastro.email;
    usuario.senha = usuarioCadastro.senha;
    return usuario;
  }


}
