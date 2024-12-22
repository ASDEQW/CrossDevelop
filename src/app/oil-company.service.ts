import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http'; // Импортируем HttpClientModule

// Интерфейс для DTO
export interface OilCompanyDTO {
  id: number;
  name: string;
  industry: string;
  cms: string;
  externaljs: string;
  sociallinks: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class OilCompanyService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7272/api/OilCompanies'; // Замените на ваш реальный API
  private authUrl = 'https://localhost:7272/api/Auth/login'; // URL для авторизации

 

  // Получить все компании
  getOilCompanies(): Observable<OilCompanyDTO[]> {
    const headers = this.createHttpHeaders();
    return this.http.get<OilCompanyDTO[]>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError)  // Обработка ошибок
    );
  }

  // Получить компанию по ID
  getOilCompanyById(id: number): Observable<OilCompanyDTO> {
    const headers = this.createHttpHeaders();
    return this.http.get<OilCompanyDTO>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)  // Обработка ошибок
    );
  }

  // Создать новую компанию
  createOilCompany(company: OilCompanyDTO): Observable<OilCompanyDTO> {
    const headers = this.createHttpHeaders();
    return this.http.post<OilCompanyDTO>(this.apiUrl, company, { headers }).pipe(
      catchError(this.handleError)  // Обработка ошибок
    );
  }

  // Обновить существующую компанию
  updateOilCompany(id: number, company: OilCompanyDTO): Observable<OilCompanyDTO> {
    const headers = this.createHttpHeaders();
    return this.http.put<OilCompanyDTO>(`${this.apiUrl}/${id}`, company, { headers }).pipe(
      catchError(this.handleError)  // Обработка ошибок
    );
  }

  // Удалить компанию
  deleteOilCompany(id: number): Observable<void> {
    const headers = this.createHttpHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)  // Обработка ошибок
    );
  }


  // Авторизация: отправка логина и пароля на сервер
  login(credentials: LoginDTO): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(this.authUrl, credentials).pipe(
      catchError(this.handleError)  // Обработка ошибок
    );
  }

  // Метод для получения токена из localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Метод для проверки, авторизован ли пользователь
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Метод для выхода (удаление токена)
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Метод для создания заголовков HTTP с токеном
  createHttpHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getCmsPercentage(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/CmsPercentage`).pipe(
      catchError(this.handleError)
    );
  }
  
  // Метод для обработки ошибок
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Ошибка клиента (например, сеть)
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Ошибка на сервере
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error('Error occurred:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  
}
