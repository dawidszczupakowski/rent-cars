import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { catchError, map, retry } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  loaderCounter = 0;
  constructor(private storageService: StorageService, private router: Router, private loaderService: LoaderService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderCounter++;
    if(this.loaderCounter === 1) {
      this.loaderService.loaderOn();
    }
    const headers = req.headers;
    const reqCopy = req.clone({
      headers,
      url: `${environment.apiUri}${req.url}`,
    });
    return next.handle(reqCopy).pipe(
      map((resp) => {
        this.loaderCounter--;
        if (this.loaderCounter) {
          this.loaderService.loaderOff();
        }
        return resp
      }),
      retry(1),
      catchError(err => {
        if (err.status === 401) {
          this.storageService.setLoggedUser('');
          this.router.navigate(['/']);
        }
        this.loaderCounter--;
        if (this.loaderCounter) {
          this.loaderService.loaderOff();
        }
        return throwError(err);
      })
    );
  }

  handleError(error) {

  }
}
