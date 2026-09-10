import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TaskRepository } from './core/domain/repositories/task.repository';
import { TaskStorageRepository } from './core/infrastructure/repositories/task-storage.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: TaskRepository, useClass: TaskStorageRepository },
  ],
};
