// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  // Импортируем HttpClientModule
import { ReactiveFormsModule } from '@angular/forms'; // Импортируем ReactiveFormsModule
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Импортируем ReactiveFormsModule
import { OilCompanyService } from '../oil-company.service';
import { AuthService } from '../auth.service';  // Импортируем сервис

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: OilCompanyService,  // Используем только один сервис
    private authServicee: AuthService,  // Используем только один сервис
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.value;

    // Подписываемся на Observable, который возвращает метод login()
    this.authService.login(credentials).subscribe(
      (response) => {
        // Сохраняем токен в локальное хранилище
        localStorage.setItem('authToken', response.token);
        // Перенаправляем пользователя на домашнюю страницу
        this.router.navigate(['/home']);
      },
      (error) => {
        // Обработка ошибки
        this.errorMessage = 'Invalid login or password';
      }

    );
    
    this.authServicee.login(credentials.username);  // Логинимся и обновляем состояние авторизации
  }
}
