import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() public ativarPagePublicacao: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public onClick(choice: string): void {
    if(choice == 'home') {
      this.ativarPagePublicacao.emit(true);
      this.router.navigate(['/home']);
    } else if(choice == 'tags') {
      this.router.navigate(['/tags']);
    } else {
      this.router.navigate(['/users']);
    }
  }

}
