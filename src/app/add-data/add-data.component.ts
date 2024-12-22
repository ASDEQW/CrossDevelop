import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OilCompanyService, OilCompanyDTO } from '../oil-company.service';
import { ReactiveFormsModule } from '@angular/forms'; // Импортируем ReactiveFormsModule

@Component({
  selector: 'app-add-data',
  standalone: true, // Убедитесь, что компонент standalone
  imports: [ReactiveFormsModule], // Добавьте сюда ReactiveFormsModule
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {
  addForm: FormGroup;  // Переименовали addEditForm в addForm

  constructor(
    private fb: FormBuilder,
    private oilCompanyService: OilCompanyService,
    private router: Router
  ) {
    // Инициализируем форму для добавления новой компании
    this.addForm = this.fb.group({
      name: ['', [
        Validators.required, 
        Validators.maxLength(100),
        Validators.pattern('^[a-zA-Zа-яА-ЯёЁ\s]+$')  // Регулярное выражение для запрещения цифр
      ]],
      industry: ['', [
        Validators.required, 
        Validators.maxLength(100),
        Validators.pattern('^[a-zA-Zа-яА-ЯёЁ\s]+$')  // Регулярное выражение для запрещения цифр
      ]],
      cms: ['', [
        Validators.required, 
        Validators.maxLength(100),
        Validators.pattern('^[a-zA-Zа-яА-ЯёЁ\s]+$')  // Регулярное выражение для запрещения цифр
      ]],
      externaljs: ['', [Validators.required, Validators.maxLength(200)]],
      sociallinks: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Нет необходимости загружать данные, так как мы только добавляем новую запись
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      const company: OilCompanyDTO = this.addForm.value;

      // Создаем новую компанию
      this.oilCompanyService.createOilCompany(company).subscribe({
        next: () => {
          this.router.navigate(['/data-table']);  // Перенаправление на список после добавления
        },
        error: (err) => {
          console.error('Error creating company:', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/data-table']);  // Возврат в список, если пользователь не хочет добавлять
  }
}
