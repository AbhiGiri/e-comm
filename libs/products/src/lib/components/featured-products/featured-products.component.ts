/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductsService } from '@e-comm/products';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {

  endSubs$: Subject<any> = new Subject();
  featuredProducts: Product[] = [];

  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this._getFeaturedProducts();
  }
  
  private _getFeaturedProducts() {
    this.productService.featuredProducts(4).pipe(takeUntil(this.endSubs$)).subscribe((resData) => {
      this.featuredProducts = resData['product'];
    })
  }

  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

}
