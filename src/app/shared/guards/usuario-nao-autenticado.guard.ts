import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioNaoAutenticadoGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  public canActivate(): boolean {
    if (this.loginService.logado) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
