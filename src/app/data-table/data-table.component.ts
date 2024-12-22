import { Component, OnInit } from '@angular/core';
import { OilCompanyService, OilCompanyDTO } from '../oil-company.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Импортируем FormsModule

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  companies: OilCompanyDTO[] = [];  // Список всех компаний
  filteredCompanies: OilCompanyDTO[] = [];  // Отфильтрованные компании
  loading: boolean = true;
  error: string | null = null;

  searchQuery: string = '';  // Запрос поиска
  sortColumn: keyof OilCompanyDTO = 'id';  // Текущий столбец для сортировки
  sortDirection: 'asc' | 'desc' = 'asc';  // Направление сортировки

  constructor(private oilCompanyService: OilCompanyService) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.oilCompanyService.getOilCompanies().subscribe(
      (data) => {
        this.companies = data;
        this.filteredCompanies = data;  // Сразу отображаем все компании
        this.loading = false;
      },
      (err) => {
        this.error = `Не удалось загрузить данные: ${err.message || 'неизвестная ошибка'}`;
        this.loading = false;
      }
    );
  }

  filterData(): void {
    const query = this.searchQuery.toLowerCase();

    // Фильтруем компании по name, industry, cms и id
    this.filteredCompanies = this.companies.filter(company => {
      const matchesName = company.name.toLowerCase().includes(query);
      const matchesIndustry = company.industry.toLowerCase().includes(query);
      const matchesCms = company.cms.toLowerCase().includes(query);
      const matchesId = company.id.toString().includes(query);  // Фильтруем по id как строке

      return matchesName || matchesIndustry || matchesCms || matchesId;
    });
  }

  sortData(column: keyof OilCompanyDTO): void {
    // Переключаем направление сортировки при клике на тот же столбец
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';  // По умолчанию сортируем по возрастанию
    }

    // Выполняем сортировку
    this.filteredCompanies.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
