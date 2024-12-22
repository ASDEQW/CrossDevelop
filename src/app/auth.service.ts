import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatusSubject: BehaviorSubject<boolean>;
  authStatus: Observable<boolean>;

  constructor() {
    // Инициализация authStatusSubject и authStatus при запуске приложения
    const token = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('authToken') : null;
    this.authStatusSubject = new BehaviorSubject<boolean>(!!token);  // Инициализируем состоянием авторизации (true/false)

    this.authStatus = this.authStatusSubject.asObservable();  // Преобразуем BehaviorSubject в Observable
  }

  // Метод для обновления статуса авторизации
  login(token: string): void {
    localStorage.setItem('authToken', token);
    this.authStatusSubject.next(true);  // Обновляем статус входа
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authStatusSubject.next(false);  // Обновляем статус выхода
  }

  isLoggedIn(): boolean {
    return this.authStatusSubject.value;  // Возвращаем текущий статус входа
  }
}
