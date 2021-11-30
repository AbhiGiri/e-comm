import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CategoriesBannerComponent,
    ProductItemComponent,
    ProductsSearchComponent,
    FeaturedProductsComponent
  ],
  exports: [
    CategoriesBannerComponent,
    ProductItemComponent,
    ProductsSearchComponent,
    FeaturedProductsComponent
  ],
})
export class ProductsModule {}
