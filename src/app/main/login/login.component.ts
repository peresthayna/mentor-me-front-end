import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioConsultaDTO } from './../../shared/models/usuario-consulta.dto.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public type: string = 'password';
  public loginForm: FormGroup;
  public usuario: UsuarioConsultaDTO = new UsuarioConsultaDTO();

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  public onChangeType(): void {
    if(this.type == 'password') {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  public onSubmit(): void {
    if(this.loginForm.valid) {
      this.usuario.email = this.loginForm.get('email')?.value;
      this.usuario.senha = Md5.hashStr(this.loginForm.get('senha')?.value);
      this.loginService.logar(this.usuario).subscribe(() => {},
      (httpError: HttpErrorResponse) => {
        alert('Usuário ou senha incorretas.');
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.aplicaCssErro('email');
    }
  }

  public resetar(): void {
    this.loginForm.reset();
  }

  public verificaValidTouched(campo): boolean {
    return !this.loginForm.get(campo)!.valid && this.loginForm.get(campo)!.touched;
  }

  public aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo)
    }
  }

}
