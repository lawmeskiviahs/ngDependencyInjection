import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskList = signal<Task[]>([])
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
    this.taskList.update((oldTasks) => [...oldTasks, newTask])
  }

  changeTaskStatus(id: string, newStatus: TaskStatus) {

    this.taskList.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  }
}
