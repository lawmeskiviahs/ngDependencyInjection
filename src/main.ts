import { bootstrapApplication } from '@angular/platform-browser';
import { InjectionToken } from '@angular/core';

import { AppComponent } from './app/app.component';
import { TaskService } from './app/tasks/task.service';
export const TasksInjectionToken = new InjectionToken<TaskService>('task-service-token')

bootstrapApplication(AppComponent, {
    providers: [{ provide: TasksInjectionToken, useClass: TaskService}]
}).catch((err) => console.error(err));
