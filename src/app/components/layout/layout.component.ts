import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit {
  username: string | null = null;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.username = this.authService.getUsername();
  }
}
