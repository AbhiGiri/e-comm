/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemDetailed, CartService, OrdersService } from '@e-comm/orders';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy {

  endSubs$: Subject<any> = new Subject();
  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(cart => {
      this.cartItemsDetailed  = []
      this.cartCount = cart?.items?.length?? 0
      cart.items?.forEach((item) => {
        const pId = item?.productId?? '';
        this.ordersService.getProduct(pId).subscribe((resProd) => {
          this.cartItemsDetailed.push({
            product: resProd.product,
            quantity: item?.quantity
          })          
        }) 
      })
    }) 
  }

  backTongShop() {
    this.router.navigate(['/products']);
  }

  deleteCart(productId: string) {
    this.cartService.deleteCartItem(productId);
  }

  onUpdateCartItemQuantity(event: any, cartItem: CartItemDetailed) {
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    }, true);
    
  }

  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

}
