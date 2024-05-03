import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { LoginComponent } from './main/login/login.component';
import { CadastroComponent } from './main/cadastro/cadastro.component';
import { UsuarioNaoAutenticadoGuard } from './shared/guards/usuario-nao-autenticado.guard';
import { UsuarioAutenticadoGuard } from './shared/guards/usuario-autenticado.guard';
import { HomeComponent } from './main/home/home.component';
import { FazerPublicacaoComponent } from './main/fazer-publicacao/fazer-publicacao.component';
import { DetalhesPublicacaoComponent } from './main/detalhes-publicacao/detalhes-publicacao.component';
import { TagComponent } from './main/tag/tag.component';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [UsuarioNaoAutenticadoGuard]},
  { path: 'cadastro', component: CadastroComponent, canActivate: [UsuarioNaoAutenticadoGuard]},
  { path: 'login', component: LoginComponent, canActivate: [UsuarioNaoAutenticadoGuard]},
  { path: 'home', component: HomeComponent, canActivate: [UsuarioAutenticadoGuard]},
  { path: 'home/nova-pergunta', component: FazerPublicacaoComponent, canActivate: [UsuarioAutenticadoGuard]},
  { path: 'home/pergunta/:id', component: DetalhesPublicacaoComponent, canActivate: [UsuarioAutenticadoGuard]},
  { path: 'tags', component: TagComponent, canActivate: [UsuarioAutenticadoGuard]},
  { path: 'users', component: HomeComponent, canActivate: [UsuarioAutenticadoGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
