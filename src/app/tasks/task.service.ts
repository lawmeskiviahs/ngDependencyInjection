import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskList = signal<Task[]>([])
  private loggingService = inject(LoggingService)
  constructor() { }

  allTasks = this.taskList.asReadonly();

  prepareTaskItem(title: string, description: string): Task {

    const item: Task = {
      id: (this.taskList().length + 1).toString(),
      title,
      description,
      status: 'OPEN'
    }
    return item
  }

  saveTask(title: string, description: string) {

    const newTask = this.prepareTaskItem(title, description);
    this.taskList.update((oldTasks) => [...oldTasks, newTask]);
    this.loggingService.log('Saved Task with Title: ' + newTask.title)
  }

  changeTaskStatus(id: string, newStatus: TaskStatus) {

    this.taskList.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
    this.loggingService.log('Changed Status to Changed: ' + newStatus)
  }
}
