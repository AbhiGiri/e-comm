/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@e-comm/products';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {

  endSubs$: Subject<any> = new Subject();
  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$))
      .subscribe(categories => {        
        this.categories = categories;
    })
  }

  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

}
