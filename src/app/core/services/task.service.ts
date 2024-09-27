import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITask } from '../interfaces/itask';
import { catchError, Observable, tap } from 'rxjs';
import { ITaskGetApiResponse } from '../interfaces/itask-get-api-response';
import Swal from 'sweetalert2';
import { IDeleteApiResponse } from '../interfaces/idelete-api-response';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }



  createTask(boardData: ITask): Observable<ITaskGetApiResponse> {

    return this.http.post<ITaskGetApiResponse>('/task/create' ,boardData).pipe(
      tap((resdata: ITaskGetApiResponse) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: resdata.message,
        });
      }),
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: error.error.message || 'An error occurred',
        });
        throw error;
      })
    )
  }

  deleteTask(Id: string): Observable<IDeleteApiResponse>{
    return this.http.delete<IDeleteApiResponse>(`/task/delete/${Id}`).pipe(
      tap((resdata: IDeleteApiResponse) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: resdata.message,
        });
      }),
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: error.message || 'An error occurred',
        });
        throw error;
      })
    );
  }

}
