import { Component, OnInit } from '@angular/core';
import { OilCompanyService, OilCompanyDTO } from '../oil-company.service'; // Импортируем сервис
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  // Импортируем Router для навигации

@Component({
  selector: 'app-data-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-cards.component.html',
  styleUrls: ['./data-cards.component.css']
})
export class DataCardsComponent implements OnInit {
  companies: OilCompanyDTO[] = [];  // Используем DTO
  loading: boolean = true;
  error: string | null = null;

  constructor(private oilCompanyService: OilCompanyService, private router: Router) { } // Внедрение сервиса и роутера

  ngOnInit(): void {
    this.loadCompanies();
  }

  // Метод для загрузки компаний
  loadCompanies(): void {
    this.oilCompanyService.getOilCompanies().subscribe(
      (data) => {
        this.companies = data;
        this.loading = false;
      },
      (err) => {
        this.error = `Не удалось загрузить данные: ${err.message || 'неизвестная ошибка'}`;
        this.loading = false;
      }
    );
  }

  // Метод для редактирования компании
  editCompany(companyId: number): void {
    this.router.navigate([`/edit-data/${companyId}`]); // Навигация на страницу редактирования
  }

  // Метод для удаления компании
  deleteCompany(companyId: number): void {
    if (confirm('Вы уверены, что хотите удалить эту компанию?')) {
      this.oilCompanyService.deleteOilCompany(companyId).subscribe(
        () => {
          this.companies = this.companies.filter(company => company.id !== companyId); // Удаление компании из списка
        },
        (err) => {
          this.error = `Ошибка при удалении компании: ${err.message || 'неизвестная ошибка'}`;
        }
      );
    }
  }
}
