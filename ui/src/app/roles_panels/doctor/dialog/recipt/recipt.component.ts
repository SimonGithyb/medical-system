import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ToastService } from 'src/app/services/toast.service';
import { MainService } from 'src/app/services/main.service';
import { DialogDataDoctor } from '../constants';

@Component({
  selector: 'app-recipt',
  templateUrl: './recipt.component.html',
  styleUrls: ['./recipt.component.scss']
})
export class ReciptComponent {

  constructor(private toast: ToastService,
              private fb:FormBuilder,
              private mainSvc: MainService,
              @Inject(MAT_DIALOG_DATA) public data: DialogDataDoctor
    ) {
      this.reciptForm.controls['personalId'].disable();
     }

  public reciptForm: FormGroup = this.fb.group({
    personalId: [this.data.personalId, Validators.required],
    drugs: this.fb.array([])
  });

  onSubmit() {

      const personalId = this.reciptForm?.get("personalId")?.value;
      const drugs = this.reciptForm?.get('drugs')?.value;

    this.mainSvc.sendNewRecipt(personalId, drugs)
      .subscribe(res => {
        this.toast.openSnackBar('Add new recipt with successful','INFO');
      }
      ,err => {
        this.toast.openSnackBar('Add new recipt with error','ERROR');
      })
  }

  addDrugs() {
    const drugForm = this.fb.group({
      title: ['', Validators.required],
      refund: ['', Validators.required]
    });

    this.drugs.push(drugForm);
  }

  get drugs() : FormArray {  
    return this.reciptForm.get("drugs") as FormArray;
  }  

  deleteDrugs(drugIndex: number) {
    this.drugs.removeAt(drugIndex);
}

}
