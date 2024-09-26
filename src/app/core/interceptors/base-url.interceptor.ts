import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BaseURLInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const baseurl = 'http://localhost:3030'

    const accesstoken = localStorage.getItem('token');

    const modifiedRequest = request.clone({
      url: baseurl + request.url,
      setHeaders: {
        authorization : `Bearer ${accesstoken}`
      }
    });
    
    return next.handle(modifiedRequest);
  }
}
