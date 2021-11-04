import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class HttpErrorInterceptor implements HttpInterceptor {

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if ((error.error instanceof ErrorEvent)) {
            // client error
            return throwError(error);
          }

          return throwError(error);
        }),
      );
  }

}
