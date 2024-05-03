import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioCadastroDTO } from 'src/app/shared/models/usuario-cadastro-dto.model';
import { UsuarioRole } from 'src/app/shared/models/usuario-role-enum.model';
import { CadastroService } from 'src/app/shared/services/cadastro.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public iconEscolhido: string = 'assets/coruja/c8.png';
  public type: string = 'password';
  public dialogOn: boolean = false;
  public cadastroForm: FormGroup;
  public avatares: string[] = ["assets/avatares/boy-1.jpg", "assets/avatares/boy-2.jpg",
  "assets/avatares/boy-3.jpeg", "assets/avatares/man-1.png",
  "assets/avatares/man-2.jpg", "assets/avatares/girl-1.jpg",
  "assets/avatares/girl-2.jpg", "assets/avatares/woman-1.jpeg",
  "assets/avatares/woman-2.jpeg", "assets/avatares/woman-3.jpeg"];
  public aplicaCssSelected: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cadastroService: CadastroService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.avatares = this.avatares.sort(() => Math.random() - 0.5);
    this.cadastroForm = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.maxLength(50)]],
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

  public onSubmit() {
    if(this.cadastroForm.valid) {
      const novoUsuario: UsuarioCadastroDTO = new UsuarioCadastroDTO();
      novoUsuario.avatar = this.iconEscolhido;
      novoUsuario.senha = Md5.hashStr(this.cadastroForm.get('senha')?.value);
      novoUsuario.email = this.cadastroForm.get('email')?.value;
      novoUsuario.nome = this.cadastroForm.get('nome')?.value;
      this.cadastroService.cadastrarUsuario(novoUsuario).subscribe(response => {
        this.loginService.logar(this.loginService.convertCadastrotoConsultaDTO(novoUsuario)).subscribe(() => {
        },(httpError: HttpErrorResponse) => {
          alert('Não foi possível logar');
        });
      }, (httpError: HttpErrorResponse) => {
        alert('Erro ao criar cadastro.');
      })
    } else {
      this.cadastroForm.markAllAsTouched();
      this.aplicaCssErro('nome');
      this.aplicaCssErro('email');
      this.aplicaCssErro('senha');
    }
  }

  public resetar(): void {
    this.cadastroForm.reset();
  }

  public verificaValidTouched(campo): boolean {
    return !this.cadastroForm.get(campo)!.valid && this.cadastroForm.get(campo)!.touched;
  }

  public aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo)
    }
  }

  public onSelect(avatar: string) {
    this.aplicaCssSelected = true;
    this.iconEscolhido = avatar;
  }

}
