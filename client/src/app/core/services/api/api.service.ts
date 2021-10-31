import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ConfigurationService} from './configuration.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  public constructor(
    private http: HttpClient,
    private conf: ConfigurationService,
  ) {
  }

  private static formatErrors(error: any): Observable<never> {
    return throwError(error.error);
  }

  public get<Res = object>(
    path: string,
    params: HttpParams = new HttpParams(),
  ): Observable<Res | never> {
    return this.http
      .get<Res>(`${this.conf.apiUrl}${path}`, {params})
      .pipe(catchError(ApiService.formatErrors));
  }

  public put<Req = object, Res = object>(path: string, body?: Req): Observable<Res | never> {
    return this.http
      .put<Res>(`${this.conf.apiUrl}${path}`, body)
      .pipe(catchError(ApiService.formatErrors));
  }

  public post<Req = object, Res = object>(path: string, body?: Req): Observable<Res | never> {
    return this.http
      .post<Res>(`${this.conf.apiUrl}${path}`, body)
      .pipe(catchError(ApiService.formatErrors));
  }

  public delete<Res = object>(path: string): Observable<Res | never> {
    return this.http
      .delete<Res>(`${this.conf.apiUrl}${path}`)
      .pipe(catchError(ApiService.formatErrors));
  }

}
