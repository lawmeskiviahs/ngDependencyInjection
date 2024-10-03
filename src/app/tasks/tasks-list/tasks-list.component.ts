import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksInjectionToken } from '../../../main';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  private selectedFilter = signal<string>('all');
  private taskService = inject(TasksInjectionToken)
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

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
