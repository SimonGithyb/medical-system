import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ToastService } from 'src/app/services/toast.service';
import { MainService } from 'src/app/services/main.service';
import { DialogDataDoctor } from '../constants';



@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent {

  constructor(private toast: ToastService,
              private fb:FormBuilder,
              private mainSvc: MainService,
              @Inject(MAT_DIALOG_DATA) public data: DialogDataDoctor
) { 
  this.referralForm.controls['personalId'].disable();
}

  public referralForm: FormGroup = this.fb.group({
    personalId: [this.data.personalId, Validators.required],
    description: [, Validators.required],
  });

  onSubmit() {
    const personalId = this.referralForm?.get("personalId")?.value;
    const description = this.referralForm?.get('description')?.value;

  this.mainSvc.sendNewReferral(personalId, description)
    .subscribe(res => {
      this.toast.openSnackBar('Add new referral with successful','INFO');
    }
    ,err => {
      this.toast.openSnackBar('Add new referral with error','ERROR');
    })
  }
}
