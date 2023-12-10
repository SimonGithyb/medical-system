import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AbstractService } from "./abstract.service";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient,
    private superServ: AbstractService) { }

  getPriceList() {
    const headers = this.superServ.getHeader();
    return this.superServ.getConfig()
      .pipe(mergeMap(config => this.http.get(config["serverUrl"] + `priceList/`, { headers })),
        catchError((err) => {
          console.error(err);
          return this.handleError(err);
        }));
  }

  sendNewRecipt(personalId: number, drugs: any) {
    const headers = this.superServ.getHeader();
    return this.superServ.getConfig()
      .pipe(mergeMap(config => this.http.put(config["serverUrl"] + `newRecipt/`, { personalId, drugs }, { headers })),
        catchError((err) => {
          console.error(err);
          return this.handleError(err);
        }));
  }

  sendNewReferral(personalId: number, description: any) {
    const headers = this.superServ.getHeader();
    return this.superServ.getConfig()
      .pipe(mergeMap(config => this.http.put(config["serverUrl"] + `newReferral/`, { personalId, description }, { headers })),
        catchError((err) => {
          console.error(err);
          return this.handleError(err);
        }));
  }

  findPerson(personalId: number) {
    const headers = this.superServ.getHeader();
    return this.superServ.getConfig()
      .pipe(mergeMap(config => this.http.get(config["serverUrl"] + `findPerson/${personalId}`, { headers })),
        catchError((err) => {
          console.error(err);
          return this.handleError(err);
        }));
  }

  handleError(error: HttpErrorResponse) {
    if (error['status'] === 400) {
      let message: string = error.error.message || error.error;
      if (message.indexOf('ECONNREFUSED') === 0) {
        message = 'Cant got data in this time';
        console.log(`ERROR: ${message}`);
        return throwError(() => new Error(message));
      }
    }
    return this.superServ.handleError(error);
  }
}
