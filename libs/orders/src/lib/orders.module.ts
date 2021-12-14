import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard, UsersModule } from '@e-comm/users';
import { CartService } from '..';


import { CardModule} from 'primeng/card';
import { ToolbarModule} from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import {BadgeModule} from 'primeng/badge';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule} from 'primeng/inputtext';
import { InputMaskModule} from 'primeng/inputmask';
import { DropdownModule} from 'primeng/dropdown';

export const ordersRoutes: Route[] = [
  { path: 'cart', component: CartPageComponent},
  { path: 'checkout', canActivate: [AuthGuard], component: CheckoutPageComponent },
  { path: 'success', component: ThankYouComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ordersRoutes),
    UsersModule,
    ButtonModule, 
    BadgeModule,
    InputNumberModule,
    CardModule,
    ToolbarModule,
    InputTextModule,
    DropdownModule,
    InputMaskModule
  ],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent
  ],
  exports: [
    CartIconComponent
  ],
})
export class OrdersModule {
  constructor (
    private cartService: CartService
  ) {
    this.cartService.initCartLocalStorage();
  }
}