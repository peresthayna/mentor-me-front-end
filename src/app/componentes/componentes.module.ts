import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarLogadoComponent } from './navbar-logado/navbar-logado.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import { RespostasComponent } from './respostas/respostas.component';
import { ResponderComponent } from './responder/responder.component';
import { EditorModule } from 'primeng-lts/editor';


@NgModule({
  declarations: [
    NavbarComponent,
    NavbarLogadoComponent,
    MenuComponent,
    RespostasComponent,
    ResponderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    EditorModule

  ],
  exports: [
    NavbarComponent,
    NavbarLogadoComponent,
    MenuComponent,
    RespostasComponent,
    ResponderComponent
  ]
})
export class ComponentesModule { }
