import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = signal('');
  password = signal('');
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  constructor(private authService: AuthService) {}

  updateUsername(value: string) {
    this.username.set(value);
  }

  updatePassword(value: string) {
    this.password.set(value);
  }

  onSubmit() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const user = new User(this.username(), this.password());

    this.authService.login(user).subscribe({
      next: () => {
        this.isLoading.set(false);
        window.location.href = '/';
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set('Invalid credentials');
      }
    });
  }
}
