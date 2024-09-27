import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskBoardsComponent } from './task-boards/task-boards.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/page/board',
    pathMatch: 'full'
  },
  {
    path: 'board',
    component: TaskBoardsComponent
  },
  {
    path: 'tasks',
    component: TaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
