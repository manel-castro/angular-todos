import { Component, Input, EventEmitter, Output } from '@angular/core';
import moment from 'moment';
import { Task } from 'src/app/Task';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() task: Task;
  day: string;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();

  constructor(
    private uiService: UiService,
    private taskService: TaskServiceService
  ) {}

  ngOnInit() {
    this.day = moment(this.task?.day || '').format('DD/MM/yyyy');

    this.taskService.onUpdateTask().subscribe((task) => {
      if (task.id !== this.task.id) return;
      console.log('Task update: ', task);
      this.task = task;
      this.day = moment(task?.day || '').format('DD/MM/yyyy');
    });
  }

  onDelete(task: Task) {
    this.onDeleteTask.emit(task);
  }

  onToggle(task: Task) {
    this.onToggleReminder.emit(task);
  }

  onToggleModal() {
    this.uiService.toggleTodoModal(true, this.task);
  }
}
