import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UiModule } from "@e-comm/ui";
import { ProductsModule } from "@e-comm/products";
import { OrdersModule } from "@e-comm/orders";

import { ToastModule } from 'primeng/toast';
import { AccordionModule} from 'primeng/accordion';
import { JwtInterceptor, UsersModule } from "@e-comm/users";

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { MessagesComponent } from './shared/messages/messages.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { NgxStripeModule } from "ngx-stripe";

const routes: Routes = [
  { 
    path: '', component: HomePageComponent
  }
]

@NgModule({
  declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent, MessagesComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    UiModule,
    OrdersModule,
    UsersModule,
    ProductsModule,
    ToastModule,
    AccordionModule,
    NgxStripeModule.forRoot('pk_test_51K3yyaSBpuRSPnHIVINiVmggXFvTm1kd1RitFnOxSmeX8CIg8qlaUZzAUWLXPSxyf5kcX2L1io0Ck2VVbJDBt6sH00QmZ3l0v1')
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
