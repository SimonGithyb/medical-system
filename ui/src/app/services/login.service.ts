import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AbstractService } from "./abstract.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private superServ: AbstractService) { }

  login(credentials: any) {
    const headers = this.superServ.getHeader();
    return this.superServ.getConfig()
      .pipe(mergeMap(config => this.http.post(config["serverUrl"] + 'login/', credentials, { headers })),
        catchError((err) => {
          console.error(err);
          return this.handleError(err);
        }));
  }

  registration(credentials: any) {
    const headers = this.superServ.getHeader();
    return this.superServ.getConfig()
      .pipe(mergeMap(config => this.http.post(config["serverUrl"] + 'login/registration', credentials, { headers })),
        catchError((err) => {
          console.error(err);
          return this.handleError(err);
        }));
  }

  logout() {
    const headers = this.superServ.getHeaderWithToken();
    return this.superServ.getConfig()
      .pipe(mergeMap(config => this.http.get(config["serverUrl"] + 'login/logout/', { headers })),
        map(result => {
          this.superServ.resetStorage();
          return result;
        }),
        catchError((err: HttpErrorResponse) =>
          err.status !== 401
            ? this.handleError(err)
            : throwError(() => new Error(err.error.message || err.error))
        ));
  }

  handleError(error: HttpErrorResponse) {
    if (error['status'] === 400) {
      let message: string = error.error.message || error.error;
      if (message.indexOf('ECONNREFUSED') === 0) {
        message = 'The username or password you entered did not match our records. Please double-check and try again.';
        console.log(`ERROR: ${message}`);
        return throwError(() => new Error(message));
      }
    }
    return this.superServ.handleError(error);
  }
}