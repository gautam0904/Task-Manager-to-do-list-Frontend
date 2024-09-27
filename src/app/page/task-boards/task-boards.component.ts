import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBoard } from 'src/app/core/interfaces/iboard';
import { BoardService } from 'src/app/core/services/board.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-task-boards',
  templateUrl: './task-boards.component.html',
  styleUrls: ['./task-boards.component.scss']
})
export class TaskBoardsComponent implements OnInit {

  loading = false;
  boards : IBoard[] = [];
  boardForm : FormGroup;
  isedit = false;

  constructor(
    private fb: FormBuilder,
    private boardService: BoardService,
    private router : Router,
    private sharedService : SharedService,
    private dialog: MatDialog
  ) { 
    this.boardForm = this.fb.group({
      // _id: [this.profile?._id],
      title: ['', Validators.required],
      task : [[]],
    })
  }
 

  ngOnInit(): void {
    this.boardService.getAllboards().subscribe({
      next : (resdata : any) => {
        console.log(resdata)
        this.boards = resdata.data;
      },
      error : (err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.error.message,
        })
      }
    })
  }

  onAddBoard() {
    if (this.boardForm.valid) {
      this.loading = true;
      this.boardService.createBoard(this.boardForm.value).subscribe({
        next: (resdata: any) => {
          this.loading = false;
        },
        error: (res) => {
          this.loading = false;
        }
      })
    } else {
      Object.values(this.boardForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  
    // const newBoardName = `Board ${this.boards.length + 1}`;
    // this.boards.push({ name: newBoardName, tasks: [] });
  }

  navigateToTasks(boardId: string="") {
  this.sharedService.setboardId(boardId); 
  this.router.navigate(['/page/tasks']);
}

  onDrop(event: CdkDragDrop<any[]>) {
    const draggedTask = event.previousContainer.data[event.previousIndex];
    const sourceBoard = event.previousContainer.data;
    const targetBoard = event.container.data;

    console.log(`Dragging task: ${draggedTask.name}`);
    console.log(`from ${sourceBoard} `);
    console.log(`to ${targetBoard}`);

    

    if (event.previousContainer === event.container) {
      // Moving within the same board
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Moving between different boards
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateBackend(); // Call to update backend after moving
    }
  }

  deleteBoard(id : string = ""){
    this.boardService.deleteBoard(id).subscribe({
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
  onDragMoved(event: any) {

  }

  updateBackend() {
    // Here you would typically make a call to your backend API to update the task lists
    console.log('Updated task lists:', this.boards);
    // Example: this.httpClient.post('/api/update-boards', this.boards).subscribe(...);
  }
}
