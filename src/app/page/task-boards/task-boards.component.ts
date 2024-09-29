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
  boards: IBoard[] = [];
  boardForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private boardService: BoardService,
    private router: Router,
    private sharedService: SharedService,
    private dialog: MatDialog
  ) {
    this.boardForm = this.fb.group({
      title: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchBoards();
  }

  fetchBoards() {
    this.boardService.getAllboards().subscribe({
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

  onAddBoard() {
    if (this.boardForm.valid) {
      this.loading = true;
      this.boardService.createBoard(this.boardForm.value).subscribe({
        next: (resdata: any) => {
          this.boards = resdata.data // Add the new board to the list
          this.loading = false;
          this.boardForm.reset();
        },
        error: (res) => {
          this.loading = false;
        }
      });
    } else {
      Object.values(this.boardForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  navigateToTasks(boardId: string = "") {
    this.sharedService.setboardId(boardId);
    this.router.navigate(['/page/tasks']);
  }

 
onDrop(event: CdkDragDrop<any[]>) {
  console.log('Previous Container:', event.previousContainer);
  console.log('Current Container:', event.container);

  const targetBoardId = event.container.id;
  const targetBoard = this.boards.find(board => board._id === targetBoardId);

  if (!targetBoard) {
    console.error(`Invalid target board: ${targetBoardId}`);
    return; // Exit if the target board is not valid
  }

  const targetElement = event.container.element.nativeElement;
  const targetRect = targetElement.getBoundingClientRect();
  
  const dropPositionX = (event.event as MouseEvent).clientX || 0;
  const dropPositionY = (event.event as MouseEvent).clientY || 0;

  console.log("Drop Position - x:", dropPositionX, "y:", dropPositionY);
  
  const isDropOnRightHalf = dropPositionX > targetRect.left + (targetRect.width / 2);
  const isDropOnBottomHalf = dropPositionY > targetRect.top + (targetRect.height / 2);

  if (event.previousContainer === event.container) {
    // Moving within the same board
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    console.log(`Task "${event.container.data[event.currentIndex].title}" moved within the same board.`);
  } else {
    // Moving between different boards
    const movedTask = event.previousContainer.data[event.previousIndex];

    // Determine target board based on position
    const targetBoardIndex = this.boards.indexOf(targetBoard);
    const targetBoardToDrop = isDropOnRightHalf && targetBoardIndex < this.boards.length - 1
      ? this.boards[targetBoardIndex + 1]
      : targetBoard;

    if (targetBoardToDrop && targetBoardToDrop !== targetBoard) {
      // Ensure target board's tasks array exists
      if (!targetBoardToDrop.tasks) {
        targetBoardToDrop.tasks = []; // Initialize if undefined
      }
      transferArrayItem(
        event.previousContainer.data,
        targetBoardToDrop.tasks,
        event.previousIndex,
        targetBoardToDrop.tasks.length // Always add to the end of the target board
      );
      console.log(`Task "${movedTask.title}" moved to "${targetBoardToDrop.title}".`);
    } else {
      // Default behavior if no valid board to drop into
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(`Task "${movedTask.title}" moved within the same board.`);
    }

    this.updateBackend(); // Call to update the backend if necessary
  }
}
  
  
  

  deleteBoard(id: string = "") {
    this.boardService.deleteBoard(id).subscribe({
      next: (resdata: any) => {
        Swal.fire({
          icon: "success",
          title: 'Deleted!',
          text: 'Board is deleted',
        });
        this.fetchBoards(); // Refresh the list of boards
      },
      error: (res) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.error.message,
        });
      }
    });
  }

  updateBackend() {
    console.log('Updated task lists:', this.boards);
    // Implement backend update logic if needed
  }
}
