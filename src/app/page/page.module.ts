import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { TaskBoardsComponent } from './task-boards/task-boards.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { FormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';
import { SharedModule } from '../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    TaskBoardsComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    DragDropModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    SharedModule,
    MatSelectModule
  ]
})
export class PageModule { }
