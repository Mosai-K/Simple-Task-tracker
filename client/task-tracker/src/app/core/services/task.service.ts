import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private initialTasks: Task[] = [
    {
      id: "1",
      title: "Design new landing page",
      description: "Create mockups and prototypes for the new company landing page",
      status: "in-progress",
      priority: "high",
      dueDate: "2025-11-01",
      createdAt: "2025-10-28",
      updatedAt: "2025-10-30",
    },
    {
      id: "2",
      title: "Update API documentation",
      description: "Document all new endpoints added in the last sprint",
      status: "todo",
      priority: "medium",
      dueDate: "2025-11-15",
      createdAt: "2025-10-29",
      updatedAt: "2025-10-29",
    },
    {
      id: "3",
      title: "Fix login bug",
      description: "Users are reporting issues with password reset functionality",
      status: "completed",
      priority: "high",
      dueDate: "2025-11-05",
      createdAt: "2025-10-25",
      updatedAt: "2025-11-01",
    },
    {
      id: "4",
      title: "Implement dark mode",
      description: "Add dark mode support across the application",
      status: "todo",
      priority: "low",
      dueDate: "2025-11-20",
      createdAt: "2025-10-30",
      updatedAt: "2025-10-30",
    },
    {
      id: "5",
      title: "Code review for PR #234",
      description: "Review and provide feedback on the authentication refactor PR",
      status: "in-progress",
      priority: "medium",
      dueDate: "2025-11-08",
      createdAt: "2025-10-31",
      updatedAt: "2025-11-01",
    },
    {
      id: "6",
      title: "Prepare Q4 presentation",
      description: "Create slides for the quarterly business review meeting",
      status: "todo",
      priority: "high",
      dueDate: "2025-11-12",
      createdAt: "2025-11-01",
      updatedAt: "2025-11-01",
    },
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.initialTasks);
  public tasks$ = this.tasksSubject.asObservable();

  constructor() { }

  getTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  getTask(id: string): Task | undefined {
    return this.getTasks().find(t => t.id === id);
  }

  addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): void {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const currentTasks = this.getTasks();
    this.tasksSubject.next([...currentTasks, newTask]);
  }

  updateTask(id: string, updates: Partial<Task>): void {
    const currentTasks = this.getTasks();
    const index = currentTasks.findIndex(t => t.id === id);
    if (index !== -1) {
      const updatedTask = { ...currentTasks[index], ...updates, updatedAt: new Date().toISOString() };
      const newTasks = [...currentTasks];
      newTasks[index] = updatedTask;
      this.tasksSubject.next(newTasks);
    }
  }

  deleteTask(id: string): void {
    const currentTasks = this.getTasks();
    this.tasksSubject.next(currentTasks.filter(t => t.id !== id));
  }
}
