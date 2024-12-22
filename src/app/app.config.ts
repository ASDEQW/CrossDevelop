import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';  // Подключаем маршруты для клиента
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),  // Включаем управление изменениями зон для улучшения производительности
    provideRouter(routes),  // Подключаем маршруты для клиента
    provideClientHydration(withEventReplay())  // Гидратация клиента с поддержкой воспроизведения событий
  ]
};
