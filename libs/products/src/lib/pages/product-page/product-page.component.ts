import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@e-comm/orders';
import { Product, ProductsService } from '@e-comm/products';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product: Product;
  endSubs$: Subject<any> = new Subject();
  quantity = 1;

  constructor(
    private productService: ProductsService,
    private actRoute: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe((params) => {
      console.log(params);
      if(params.productId) {
        this._getProduct(params.productId)
      }
    })
  }
  
  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    }
    this.cartService.setCartItem(cartItem);
  }

  private _getProduct(id: string) {
    this.productService.getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((prod: any) => {          
        this.product = prod.product;
      })
  }


  ngOnDestroy () {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

}
