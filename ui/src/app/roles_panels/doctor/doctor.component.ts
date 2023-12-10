import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { MainService } from 'src/app/services/main.service';

import { ReciptComponent } from './dialog/recipt/recipt.component';
import { ReferralComponent } from './dialog/referral/referral.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  constructor(private router: Router,
              private dialog: MatDialog,
              private overlay: Overlay,
              private toast: ToastService,
              private fb:FormBuilder,
              private mainSvc: MainService
            ) {}
  
  public currentPage: string = '';
  public person: any = null;
  public newPerson: boolean = false;

  public personFindForm: FormGroup = this.fb.group({
    personalId: [, Validators.required]
  });

  ngOnInit() {
    sessionStorage.setItem('currentPage', '/doctor');

    if(this.accessToken === null) {
      this.router.navigate(['/']);
    }
  }
  
  get accessToken() {
    return sessionStorage.getItem('accessToken');
  }

  openRecipt(personalId: number) {
    const dialogRef = this.dialog.open(ReciptComponent, {
      data: { personalId },
      height: '600px',
      width: '1000px',
      scrollStrategy: this.overlay.scrollStrategies.noop(),
     });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openReferral(personalId: number) {
    const dialogRef = this.dialog.open(ReferralComponent, {
      data: { personalId },
      height: '600px',
      width: '1000px',
      scrollStrategy: this.overlay.scrollStrategies.noop(),
     });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onSubmit() {
    const personalId = this.personFindForm?.get("personalId")?.value;

  this.mainSvc.findPerson(personalId)
    .subscribe(res => {
      switch (typeof res) {
        case 'string':
          this.toast.openSnackBar(res,'INFO');
          this.person = null;
          this.newPerson = true;
          break;
        case 'object':
          this.newPerson = false;
          this.person = res;
          break;
      }
    }
    ,err => {
      this.toast.openSnackBar('Add new referral with error','ERROR');
    })
  }
}
