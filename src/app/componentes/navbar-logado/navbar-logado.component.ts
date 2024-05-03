import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-navbar-logado',
  templateUrl: './navbar-logado.component.html',
  styleUrls: ['./navbar-logado.component.css']
})
export class NavbarLogadoComponent implements OnInit {

  @Output('menu')
    public menu: EventEmitter<boolean> = new EventEmitter<boolean>();
  public emitOnOff: boolean = true;
  @Input() public busca: string;
  @Output('eventBusca')
    public eventBusca: EventEmitter<string> = new EventEmitter<string>();

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  public deslogar(): void {
    this.loginService.deslogar();
  }

  public emitMenu(): void {
    this.emitOnOff = !this.emitOnOff;
    this.menu.emit(this.emitOnOff);
  }

  public emitBusca(): void {
    if(this.busca != null && this.busca != '') {
      this.eventBusca.emit(this.busca);
    }
  }

}
