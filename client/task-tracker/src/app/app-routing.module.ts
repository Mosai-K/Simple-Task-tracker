import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    title: 'Tasks - Task Tracker'
  },

  {
    path: 'tasks/create',
    component: TaskFormComponent,
    title: 'New Task - Task Tracker'
  },
  {
    path: 'tasks/edit/:id',
    component: TaskFormComponent,
    title: 'Edit Task - Task Tracker'
  },
  {
    path: '**',
    redirectTo: '/tasks'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }