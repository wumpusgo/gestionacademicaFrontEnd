import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProgramaAcademicoService } from '../../services/programa-academico.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [RouterOutlet, RouterLink],
  styles: []
})
export class LayoutComponent implements OnInit {
  username: string | null = null;

  constructor(public authService: AuthService) { }


  ngOnInit() {
    this.username = this.authService.getUsername();
  }
}
