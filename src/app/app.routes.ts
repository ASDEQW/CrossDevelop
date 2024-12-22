// app.routes.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DataTableComponent } from './data-table/data-table.component';
import { DataCardsComponent } from './data-cards/data-cards.component';
import { AddDataComponent } from './add-data/add-data.component';
import { EditDataComponent } from './edit-data/edit-data.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http'; // Импортируем HttpClientModule
import { CmsPercentageComponent } from './cms-percentage/cms-percentage.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'data-table', component: DataTableComponent },
    { path: 'data-cards', component: DataCardsComponent },
    { path: 'add-data', component: AddDataComponent },
    { path: 'edit-data/:id', component: EditDataComponent }, // Редактирование компании по ID
    { path: 'login', component: LoginComponent }, // Редактирование компании по ID
    { path: 'cms-percentage', component: CmsPercentageComponent }, // Редактирование компании по ID
    { path: '', redirectTo: '/home', pathMatch: 'full' }  // Стартовый маршрут
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
