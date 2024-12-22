import { RenderMode, ServerRoute } from '@angular/ssr';

// Конфигурация маршрутов для рендеринга на сервере
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',  // Все маршруты
    renderMode: RenderMode.Prerender  // Пререндеринг всех страниц
  }
];
