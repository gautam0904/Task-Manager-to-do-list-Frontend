import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { catchError, Observable, tap } from 'rxjs';
import { IUserGetApiResponse } from '../interfaces/iuser-get-api-response';
import Swal from 'sweetalert2';
import { IDeleteApiResponse } from '../interfaces/idelete-api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(loginData: IUser) {
    return this.http.post<IUserGetApiResponse>('/user/login', {
      "email": loginData.email,
      "password": loginData.password
    }).pipe(
      tap((resdata: IUserGetApiResponse) => {
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
    )
  }

  update(updateData: IUser , imageFile: File) {
    const formData = new FormData();
    formData.append('name', updateData.name);
    formData.append('profilePic', imageFile, imageFile.name);  
      return this.http.put<IUserGetApiResponse>(`/user/update/${updateData._id}`, formData).pipe(
        tap((resdata: IUserGetApiResponse) => {
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
  updatepassword(updateData: IUser) {

      return this.http.put<IUserGetApiResponse>(`/user/update/${updateData._id}`, updateData).pipe(
        tap((resdata: IUserGetApiResponse) => {
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

  signup(signupData: IUser , imageFile: File): Observable<IUserGetApiResponse> {
    const formData = new FormData();
    formData.append('name', signupData.name);
    formData.append('email', signupData.email);
    formData.append('password', signupData.password);;
    formData.append('profilePic', imageFile, imageFile.name);  
    return this.http.post<IUserGetApiResponse>('/user/signup' ,formData).pipe(
      tap((resdata: IUserGetApiResponse) => {
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

  getAllusers(): Observable<IUserGetApiResponse> {
    return this.http.get<IUserGetApiResponse>('/user/getAll').pipe(
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
  sendOTP(email : any): Observable<any> {
    console.log(email);
    
    if (email) {
    return this.http.post<any>('/user/getOTP', { email }).pipe(
      catchError((error) => {
        console.log(error);
        throw error;
      })
    );
  } else {
    throw new Error("Email is required");
  }
  }
  verifyOTP(vallue : any): Observable<any> {
    return this.http.post<any>('/user/verifyOTP' , vallue).pipe(
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

  deleteUser(userId: string): Observable<IDeleteApiResponse>{
    return this.http.delete<IDeleteApiResponse>(`/user/delete/${userId}`).pipe(
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
