import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { of } from 'rxjs';

describe('TaskFormComponent - Create Mode', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['getTask', 'addTask', 'updateTask']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      paramMap: of({ get: (key: string) => null })
    };

    await TestBed.configureTestingModule({
      imports: [TaskFormComponent, ReactiveFormsModule],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize empty form in create mode with default values', () => {
    expect(component.isEditMode).toBeFalse();
    expect(component.taskForm.get('title')?.value).toBe('');
    expect(component.taskForm.get('status')?.value).toBe('todo');
    expect(component.taskForm.get('priority')?.value).toBe('medium');
    expect(component.taskForm.valid).toBeFalse();
  });

  it('should call addTask and navigate when submitting a valid form', () => {

    component.taskForm.patchValue({
      title: 'New Task',
      description: 'Test description',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2025-12-01'
    });

    component.onSubmit();

    expect(mockTaskService.addTask).toHaveBeenCalledWith(component.taskForm.value);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tasks']);
  });

  it('should NOT call addTask when submitting an invalid form', () => {
    component.onSubmit();

    expect(mockTaskService.addTask).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate back to /tasks on cancel', () => {
    component.onCancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tasks']);
  });
});

describe('TaskFormComponent - Edit Mode', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  const mockTask = {
    id: '123',
    title: 'Existing Task',
    description: 'Existing Description',
    status: 'completed',
    priority: 'low',
    dueDate: '2025-10-10T00:00:00.000Z',
    createdAt: '2025-10-01T00:00:00.000Z',
    updatedAt: '2025-10-05T00:00:00.000Z'
  };

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['getTask', 'addTask', 'updateTask']);
    mockTaskService.getTask.and.returnValue(mockTask);

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      paramMap: of({ get: (key: string) => (key === 'id' ? '123' : null) })
    };

    await TestBed.configureTestingModule({
      imports: [TaskFormComponent, ReactiveFormsModule],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form with existing task data', () => {
    expect(component.isEditMode).toBeTrue();
    expect(component.taskId).toBe('123');
    expect(mockTaskService.getTask).toHaveBeenCalledWith('123');

    expect(component.taskForm.get('title')?.value).toBe('Existing Task');
    expect(component.taskForm.get('status')?.value).toBe('completed');
    expect(component.taskForm.get('dueDate')?.value).toBe('2025-10-10');
  });

  it('should call updateTask and navigate when submitting a valid form', () => {

    component.onSubmit();

    expect(mockTaskService.updateTask).toHaveBeenCalledWith('123', component.taskForm.value);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tasks']);
  });
});
