import { Component } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { UiService } from 'src/app/services/ui.service';
import $ from 'jquery';
import moment from 'moment';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.css'],
})
export class TodoModalComponent {
  showTodoModal: boolean = false;
  task: Task;

  constructor(
    private uiService: UiService,
    private taskService: TaskServiceService
  ) {}

  showTodoModalHandler(show: boolean) {
    this.showTodoModal = show;

    if (show) {
      setTimeout(() => {
        $('#taskday').val(moment(this.task.day).format('yyy-MM-DD'));
      }, 0);
    }
  }

  toggleTodoModal(show: boolean) {
    console.log('clicked');
    this.showTodoModalHandler(show);
  }

  clickedTodoModal(e: MouseEvent) {
    e.stopPropagation();
    console.log('clicked modal', e);
  }

  ngOnInit() {
    this.uiService.onToggleTodoModal().subscribe(({ show, task }) => {
      this.showTodoModalHandler(show);
      this.task = task;
    });
  }

  handleDayChange(event: Event) {
    console.log('changed');
    console.log(event);
    const { value } = event.target as HTMLInputElement;

    console.log('changed value; ', value);
    console.log('changed moment(value).valueOf(); ', moment(value).valueOf());
    this.task.day = moment(value).valueOf();
    $('#taskday').val(value);
  }

  onSubmit() {
    this.task.day = moment(this.task.day).valueOf();

    this.taskService.updateTask(this.task).subscribe();

    this.showTodoModal = false;
  }
}
