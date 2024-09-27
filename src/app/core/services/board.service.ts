import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { IBoardGetApiResponse } from '../interfaces/iboard-get-api-response';
import { IBoard } from '../interfaces/iboard';
import { IDeleteApiResponse } from '../interfaces/idelete-api-response';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  update(updateData: IBoard) {  
      return this.http.put<IBoardGetApiResponse>('/board/update', updateData).pipe(
        tap((resdata: IBoardGetApiResponse) => {
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

  createBoard(boardData: IBoard): Observable<IBoardGetApiResponse> {

    return this.http.post<IBoardGetApiResponse>('/board/create' ,boardData).pipe(
      tap((resdata: IBoardGetApiResponse) => {
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

  getAllboards(): Observable<IBoardGetApiResponse> {
    return this.http.get<IBoardGetApiResponse>('/board/getAll').pipe(
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: error.error.message || 'An error occurred',
        });
        throw error;
      })
    );
  }

  getById(boardId : string): Observable<IBoardGetApiResponse> {
    return this.http.get<IBoardGetApiResponse>(`/board/get/${boardId}`).pipe(
      catchError((error) => {
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: error.error.message || 'An error occurred',
        });
        throw error;
      })
    );
  }

  deleteBoard(Id: string): Observable<IDeleteApiResponse>{
    return this.http.delete<IDeleteApiResponse>(`/board/delete/${Id}`).pipe(
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
