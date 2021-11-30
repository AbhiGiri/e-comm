import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CartIconComponent,
    OrderSummaryComponent,
    CartPageComponent,
    CheckoutPageComponent,
    ThankYouComponent
  ],
  exports: [
    CartIconComponent,
    OrderSummaryComponent,
    CartPageComponent,
    CheckoutPageComponent,
    ThankYouComponent
  ],
})
export class OrdersModule {}
