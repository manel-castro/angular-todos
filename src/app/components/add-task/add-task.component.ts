import { Component, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  @Output() onAddTask = new EventEmitter<Task>();
  text1: string;
  day: number;
  reminder: boolean = false;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => {
      this.showAddTask = value;
    });
  }

  onSubmit() {
    if (!this.text1) {
      alert('Please add a task.');
      return;
    }

    const newTask = {
      text: this.text1,
      day: this.day,
      reminder: this.reminder,
    };

    // @todo: emit event
    this.onAddTask.emit(newTask);

    this.text1 = '';
    this.day = 0;
    this.reminder = false;
  }
}
