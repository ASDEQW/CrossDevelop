import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OilCompanyService, OilCompanyDTO } from '../oil-company.service'; // Импортируем сервис
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'; // Для работы с формами
import { ReactiveFormsModule } from '@angular/forms'; // Импортируем ReactiveFormsModule

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css'],
  imports: [ReactiveFormsModule], // Добавьте сюда ReactiveFormsModule
})
export class EditDataComponent implements OnInit {
  companyId!: number;
  company: OilCompanyDTO | null = null;
  editForm: FormGroup;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private oilCompanyService: OilCompanyService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Инициализация формы с встроенным валидатором для проверки наличия цифр
    this.editForm = this.fb.group({
      name: ['', [Validators.required, this.noNumbersValidator()]], // Валидатор для name
      industry: ['', [Validators.required, this.noNumbersValidator()]], // Валидатор для industry
      cms: ['', [this.noNumbersValidator()]], // Валидатор для cms (необязательное поле)
      externaljs: [''],
      sociallinks: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.companyId = +params['id']; // Получаем ID компании из параметров маршрута
      this.loadCompany(); // Загружаем данные компании
    });
  }

  // Метод для загрузки компании по ID
  loadCompany(): void {
    this.loading = true;
    this.oilCompanyService.getOilCompanyById(this.companyId).subscribe(
      (data) => {
        this.company = data;
        this.setFormData(); // Заполняем форму данными компании
        this.loading = false;
      },
      (err) => {
        this.error = `Не удалось загрузить данные компании: ${err.message || 'неизвестная ошибка'}`;
        this.loading = false;
      }
    );
  }

  // Метод для заполнения формы данными компании
  setFormData(): void {
    if (this.company) {
      this.editForm.patchValue({
        name: this.company.name,
        industry: this.company.industry,
        cms: this.company.cms,
        externaljs: this.company.externaljs,
        sociallinks: this.company.sociallinks
      });
    }
  }

  // Встраиваем кастомный валидатор для проверки наличия цифр
  noNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && /\d/.test(value)) {
        return { 'noNumbers': { value: 'Поле не должно содержать цифры' } };
      }
      return null;
    };
  }

  // Метод для отправки формы и обновления данных компании
  onSubmit(): void {
    if (this.editForm.valid && this.company) {
      this.loading = true;
      const updatedCompany: OilCompanyDTO = { ...this.company, ...this.editForm.value };
      this.oilCompanyService.updateOilCompany(this.companyId, updatedCompany).subscribe(
        () => {
          // Переход на страницу с карточками данных после успешного обновления
          this.router.navigate(['/data-cards']); // Здесь происходит перенаправление на страницу с карточками данных
        },
        (err) => {
          this.error = `Ошибка при обновлении компании: ${err.message || 'неизвестная ошибка'}`;
          this.loading = false;
        }
      );
    }
  }

  // Добавляем метод для перехода назад
  goBack(): void {
    this.router.navigate(['/data-cards']); // Или любой другой маршрут для возврата
    // Либо можно использовать: window.history.back();
  }
}
