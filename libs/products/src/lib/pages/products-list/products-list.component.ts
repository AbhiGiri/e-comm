import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@e-comm/products';
import { Subject } from 'rxjs';

@Component({
  selector: 'products-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  endsSubs$: Subject<any> = new Subject();
  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage = false;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe((params) => {
      params.categoryId ? this._getProducts([params.categoryId]) : this._getProducts();
      if(params.categoryId) {
        this.isCategoryPage = true;
      }
    })
    this._getCategories();
  }

  private _getProducts(categoriesfilter?: string[]) {
    this.productsService.getProducts(categoriesfilter).subscribe(products => {
      this.products = products;
    })
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  categoriesFilter() {
    const selectedCategoriesIds  = this.categories.filter((category) => {
      category.checked
    })
    .map((category) => category.id);
    
    this._getProducts(selectedCategoriesIds as string[]);
    
  }

}
