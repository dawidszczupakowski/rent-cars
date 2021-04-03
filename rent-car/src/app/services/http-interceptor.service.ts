import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private storageService: StorageService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = req.headers;
    const reqCopy = req.clone({
      headers,
      url: `${environment.apiUri}${req.url}`,
    });
    return next.handle(reqCopy).pipe(
      retry(1),
      catchError(err => {
        if (err.status === 401) {
          this.storageService.setLoggedUser('');
        }
        return throwError(err);
      })
    );
  }

  handleError(error) {

  }
}
