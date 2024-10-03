import { InjectionToken, Provider } from "@angular/core";

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export type TaskStatusOption = {
   value: 'open' | 'in-progress' | 'done',
   taskStatus: TaskStatus,
   text: string
}[]

export const STATUS_INJECTION_TOKEN = new InjectionToken<TaskStatusOption>('task-status-options')

export const TaskStatusOptions: TaskStatusOption = [
  {
    value: 'open',
    taskStatus: 'OPEN',
    text: 'Open'
  },
  {
    value: 'in-progress',
    taskStatus: 'IN_PROGRESS',
    text: 'In-Progress'
  },
  {
    value: 'done',
    taskStatus: 'DONE',
    text: 'Done'
  }
]

export const TaskStatusProvider: Provider = {
  provide: STATUS_INJECTION_TOKEN,
  useValue: TaskStatusOptions
}
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
