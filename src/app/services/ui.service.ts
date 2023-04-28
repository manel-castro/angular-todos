import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddTask: boolean = false;
  private subject = new Subject<any>();

  constructor() {}

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  private subjectTodoModal = new Subject<any>();

  toggleTodoModal(show: boolean, task?: Task): void {
    this.subjectTodoModal.next({ show, task });
  }

  onToggleTodoModal(): Observable<any> {
    return this.subjectTodoModal.asObservable();
  }
}
