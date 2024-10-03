import { Component, ElementRef, Inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { TasksInjectionToken } from '../../../main';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  constructor(
    @Inject(TasksInjectionToken) private taskService: TaskService
  ) { }

  onAddTask(title: string, description: string) {
    
    if ( title && description ) {
      this.taskService.saveTask(title, description);
      this.formEl()?.nativeElement.reset();
    }
  }
}
