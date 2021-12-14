/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, OrdersService } from '@e-comm/orders';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
  styles: [
  ]
})
export class OrderSummaryComponent implements OnInit, OnDestroy {

  totalPrice!: any;
  endSubs$: Subject<any> = new Subject();
  isCheckout = false;
  

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private router: Router
  ) { 
    this.router.url.includes('checkout') ? (this.isCheckout = true) : (this.isCheckout = false)
  }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  private _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      cart.items?.map((item: any) => {
        this.orderService.getProduct(item.productId).pipe(take(1)).subscribe((resProd) => {          
          this.totalPrice += resProd.product.price * item.quantity;
          
        })
      })
    })
  }

  navigateToCheckout() {
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

}

