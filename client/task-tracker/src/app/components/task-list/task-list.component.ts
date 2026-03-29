import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../../core/interfaces/task.interface';
import { Router } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  private taskSub!: Subscription;

  constructor(private router: Router, private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskSub = this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      console.log('Tasks loaded:', this.tasks.length);
    });
  }

  ngOnDestroy(): void {
    if (this.taskSub) {
      this.taskSub.unsubscribe();
    }
  }

  editTask(taskId: string): void {
    console.log('Edit task:', taskId);
    this.router.navigate(['/tasks/edit', taskId]);

  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Delete task
  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId);
      console.log('Task deleted:', taskId);
    }
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'todo': 'bg-primary',
      'in-progress': 'bg-warning text-dark',
      'completed': 'bg-success'
    };
    return statusClasses[status] || 'bg-secondary';
  }

  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'todo': 'To Do',
      'in-progress': 'In Progress',
      'completed': 'Done'
    };
    return statusLabels[status] || status;
  }

  getPriorityClass(priority: string): string {
    const priorityClasses: { [key: string]: string } = {
      'low': 'bg-secondary',
      'medium': 'bg-info',
      'high': 'bg-danger'
    };
    return priorityClasses[priority] || 'bg-secondary';
  }

  // Get priority label
  getPriorityLabel(priority: string): string {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  }

  isOverdue(task: Task): boolean {
    if (task.status === 'done') return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  }
}
