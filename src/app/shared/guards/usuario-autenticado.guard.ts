import { LoginService } from '../services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoGuard implements CanActivate{

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  public canActivate(): boolean {
    if (this.loginService.logado) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
