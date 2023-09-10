import { Component, OnInit } from '@angular/core';

import { PriceService } from '../services/price.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit{

  public priceList: any;
  public headers = ['Name', 'Cost', 'Material', 'Indications', 'Time'];

  constructor(private priceSvc: PriceService) { }

  ngOnInit(): void {
    sessionStorage.setItem('currentPage', '/price');
  }

  loadPriceList(): void {
    this.priceSvc.getPriceList()
    .subscribe(res => this.priceList = res
    ,error => console.error(error))
  }

}
