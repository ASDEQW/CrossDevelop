import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';  // Импортируем сервис
import { CommonModule } from '@angular/common'; // Импортируем ReactiveFormsModule

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  imports: [RouterModule, CommonModule],
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService  // Инжектируем сервис авторизации
  ) {}

  ngOnInit(): void {
    // Подписываемся на изменения статуса входа
    this.authService.authStatus.subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        this.username = localStorage.getItem('username') || '';
        this.isAdmin = localStorage.getItem('role') === 'admin';  // Проверяем роль
        this.router.navigate(['/home']);  // Перенаправляем на домашнюю страницу
      } else {
        this.router.navigate(['/login']);  // Перенаправляем на страницу входа
      }
    });

    // Проверка начального состояния
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.username = localStorage.getItem('username') || '';
      this.isAdmin = localStorage.getItem('role') === 'admin';
      this.router.navigate(['/home']);
    }
  }

  // Метод для выхода
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
