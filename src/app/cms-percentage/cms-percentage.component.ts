import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { OilCompanyService } from '../oil-company.service';  // Импортируем ваш сервис
import { Observable } from 'rxjs';  // Для работы с Observable
import { catchError } from 'rxjs/operators';  // Для обработки ошибок
import { CommonModule } from '@angular/common'; // Импортируем CommonModule
import { Chart, registerables } from 'chart.js';  // Импортируем Chart.js

// Регистрируем модули для использования с Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-cms-percentage',
  templateUrl: './cms-percentage.component.html',
  styleUrls: ['./cms-percentage.component.css'],
  imports: [CommonModule], // Добавляем сюда CommonModule
})
export class CmsPercentageComponent implements OnInit {
  cmsPercentages: { CMSName: string, percentageOfTotal: string }[] = []; // Массив с процентами CMS по каждой компании
  errorMessage: string = ''; // Сообщение об ошибке, если данные не получены

  @ViewChild('cmsChart') cmsChartRef!: ElementRef; // Ссылка на элемент canvas для гистограммы

  constructor(private oilCompanyService: OilCompanyService) {}

  ngOnInit(): void {
    // Загружаем данные о процентном соотношении CMS
    this.oilCompanyService.getCmsPercentage().pipe(
      catchError(error => {
        this.errorMessage = 'Ошибка при получении данных: ' + error;
        return []; // Возвращаем пустой массив, чтобы избежать дальнейших ошибок
      })
    ).subscribe(data => {
      this.processCmsData(data);
    });
  }

  // Функция для обработки полученных данных CMS
  processCmsData(data: { [key: string]: number }): void {
    const totalPercentage = Object.values(data).reduce((total, percentage) => total + percentage, 0);

    // Если сумма процентов больше нуля, рассчитываем процент для каждой компании
    if (totalPercentage > 0) {
      this.cmsPercentages = Object.entries(data).map(([CMSName, percentage]) => ({
        CMSName: CMSName.charAt(0).toUpperCase() + CMSName.slice(1),  // Приводим к читаемому виду
        percentageOfTotal: percentage.toFixed(2) // Процент CMS для компании
      }));

      // После того как данные получены, создаем график
      this.createChart();
    }
  }

  // Функция для создания и отображения графика
  createChart(): void {
    const cmsNames = this.cmsPercentages.map(company => company.CMSName);
    const percentages = this.cmsPercentages.map(company => parseFloat(company.percentageOfTotal));

    const ctx = this.cmsChartRef.nativeElement.getContext('2d');

    // Создаем новый график
    new Chart(ctx, {
      type: 'bar',  // Тип диаграммы — гистограмма
      data: {
        labels: cmsNames,
        datasets: [{
          label: 'Процент CMS',
          data: percentages,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',  // Цвет столбцов
          borderColor: 'rgba(54, 162, 235, 1)',      // Цвет границ столбцов
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
