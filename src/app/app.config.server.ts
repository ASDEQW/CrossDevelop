import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),  // Провайдер для рендеринга на сервере
    provideServerRoutesConfig(serverRoutes)  // Провайдер конфигурации маршрутов для SSR
  ]
};

// Объединяем конфигурацию клиента и сервера
export const config = mergeApplicationConfig(appConfig, serverConfig);
