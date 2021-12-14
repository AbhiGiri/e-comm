/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { CartService, OrdersService } from '@e-comm/orders';

@Component({
  selector: 'orders-thank-you',
  templateUrl: './thank-you.component.html',
  styles: [
  ]
})
export class ThankYouComponent implements OnInit{

constructor(
  private orderService: OrdersService,
  private cartService: CartService
) {

}

ngOnInit() {
  const orderData = this.orderService.getCatchedOrderData();

  this.orderService.postOrder(orderData).subscribe(() => {
    this.cartService.emptyCart();
    this.orderService.removeCatchedOrderData();
  })

}
  
 
}
