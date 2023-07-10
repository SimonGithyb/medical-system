import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbstractService {

  [x: string]: any;

  private config: any;

  constructor(private http: HttpClient,
     ) {
    this.config = environment;
  }

  public resetStorage() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("domain");
  }

  public getConfig() {
    if (!this.config) {
      this.config = environment;
    }
    return of(this.config);
  }

  public getHeader() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public getHeaderWithToken() {
    return new HttpHeaders({ 'Content-Type': 'application/json' })
      .set("Access-token", this.getToken());
  }

  public handleError(error: HttpErrorResponse) {
    let message: string = error.error.message || error.error || error.statusText || 'some error';
    if (error['status'] == 401 || error['status'] == 403) {
      message = error.statusText;
      this.resetStorage();
    } else if (error['status'] == 500) {
      message = 'Internal server error';
    } else if (error['status'] == 400) {
      if (message.indexOf('ECONNREFUSED') >= 0) {
        message = 'Do not have access to far server';
      } else {
        message = message; //`Bad request: ${message}`;
      }
    }
    console.log(`ERROR: ${message}`);
    return throwError(() => new Error(message));
  }

  private getToken(): string {
    return sessionStorage.getItem('accessToken') || '';
  }
}