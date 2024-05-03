import { LoginService } from '../services/login.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Interceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.loginService.obterTokenUsuario;
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl: Array<any> = environment.apiUrl.split('/');

    if (token && requestUrl[2] === apiUrl[2]) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
      return next.handle(request).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.loginService.deslogar();
          return throwError('Falha ao renovar sessão.');
        }
        else {
          return throwError(error.message);
        }
      }));
    }
    else {
      return next.handle(request);
    }
  }
}
