import { Component } from '@angular/core';
import { TaskService } from './core/services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task Tracker';
  currentYear = new Date().getFullYear();
  angularVersion = '18.2.0';

  constructor(private taskService: TaskService) { }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.taskService.setSearchQuery(target.value);
  }
}