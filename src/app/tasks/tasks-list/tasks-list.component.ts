import {
  Component,
  computed,
  signal,
} from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  private selectedFilter = signal<string>('all');
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.taskService
          .allTasks()
          .filter((item) => item.status === 'OPEN');
      case 'in-progress':
        return this.taskService
          .allTasks()
          .filter((item) => item.status === 'IN_PROGRESS');
      case 'done':
        return this.taskService
          .allTasks()
          .filter((item) => item.status === 'DONE');
      default:
        return this.taskService.allTasks();
    }
  });

  constructor(
    private taskService: TaskService
  ) { }

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
