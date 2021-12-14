import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UiModule } from "@e-comm/ui";

import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule} from 'primeng/checkbox';
import { RatingModule} from 'primeng/rating';
import { InputNumberModule} from 'primeng/inputnumber';

 export const routes: Routes = [
  { path: 'products', component: ProductsListComponent},
  { path: 'category/:categoryId', component: ProductsListComponent},
  { path: 'products/:productsId', component: ProductPageComponent}
];

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule.forChild(routes),
    UiModule,
    ButtonModule,
    CheckboxModule,
    RatingModule,
    InputNumberModule
  ],
  declarations: [
    CategoriesBannerComponent,
    ProductItemComponent,
    ProductsSearchComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductPageComponent
  ],
  exports: [
    CategoriesBannerComponent,
    ProductItemComponent,
    ProductsSearchComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductPageComponent
  ],
})
export class ProductsModule {}
