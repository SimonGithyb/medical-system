import { Component } from '@angular/core';

import { PriceService } from '../services/price.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent {

  public priceList: any;
  public headers = ['Name', 'Cost', 'Material', 'Indications', 'Time'];

  constructor(private priceSvc: PriceService) {}

  loadPriceList(): void {
    this.priceSvc.getPriceList()
    .subscribe(res => this.priceList = res
    ,error => console.error(error))
  }

}
