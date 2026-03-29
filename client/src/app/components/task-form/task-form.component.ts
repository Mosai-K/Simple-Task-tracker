import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  taskId: string | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['todo', Validators.required],
      priority: ['medium', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('id');
      if (this.taskId) {
        this.isEditMode = true;
        this.taskService.getTask(this.taskId).subscribe({
          next: (task) => {
            if (task) {
              this.taskForm.patchValue({
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
              });
            }
          },
          error: (err) => console.error('Failed to get task', err)
        });
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      if (this.isEditMode && this.taskId) {
        this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe({
          next: () => this.router.navigate(['/tasks']),
          error: (err) => console.error('Failed to update task', err)
        });
      } else {
        this.taskService.addTask(this.taskForm.value).subscribe({
          next: () => this.router.navigate(['/tasks']),
          error: (err) => console.error('Failed to add task', err)
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}
