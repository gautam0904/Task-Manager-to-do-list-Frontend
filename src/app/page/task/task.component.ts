import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IBoard } from 'src/app/core/interfaces/iboard';
import { BoardService } from 'src/app/core/services/board.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { TaskService } from 'src/app/core/services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  loading = false;
  boards : IBoard[] = [];
  taskForm! : FormGroup;
  isedit = false;
  boardId : string |undefined;
// enum: ['to-do', 'in-progress', 'done'],
  constructor(
    private fb: FormBuilder,
    private boardService: BoardService,
    private router : Router,
    private sharedService : SharedService,
    private taskService : TaskService
  ) { 
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      boardId: ['', Validators.required],
    });
  }
 

  ngOnInit(): void {
    this.sharedService.boardId$.subscribe(bI => {
      this.boardId = bI;
      if (this.boardId) {
        this.taskForm.patchValue({ boardId: this.boardId }); // Set boardId in form
        this.boardService.getById(this.boardId).subscribe({
          next: (resdata: any) => {
            this.boards = resdata.data;
          },
          error: (err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.error.message,
            });
          }
        });
      }
    });
  }

  onAddTask() {
    
    if (this.taskForm.valid) {
      this.loading = true;
      this.taskService.createTask(this.taskForm.value).subscribe({
        next: (resdata: any) => {
          this.loading = false;
          this.taskForm.reset();
        },
        error: (res) => {
          this.loading = false;
          this.taskForm.reset();
        }
      })
    } else {
      Object.values(this.taskForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  deleteTask(id : string = ""){
    this.taskService.deleteTask(id).subscribe({
      next: (resdata: any) => {
       Swal.fire({
        icon : "success",
        title: 'Delete!',
        text: 'Board is deleted',
       })
      },
      error: (res) => {
        this.loading = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.error.message,
        })
      }
    })
  }
}
