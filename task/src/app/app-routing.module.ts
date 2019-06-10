import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {TaskListComponent} from './task/list/task-list.component';
import {TaskListContainerComponent} from './task/list/task-list-container/task-list-container.component';
import {TaskComponent} from './task/task.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'list',
    component: TaskListContainerComponent
  },
  {
    path: 'task',
    component: TaskComponent
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
