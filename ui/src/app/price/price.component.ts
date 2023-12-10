import { Component, OnInit } from '@angular/core';

import { MainService } from '../services/main.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit{

  public priceList: any;
  public headers = ['Name', 'Cost', 'Material', 'Indications', 'Time'];

  constructor(private mainSvc: MainService) { }

  ngOnInit(): void {
    sessionStorage.setItem('currentPage', '/price');
  }

  loadPriceList(): void {
    this.mainSvc.getPriceList()
    .subscribe(res => this.priceList = res
    ,error => console.error(error))
  }

}
