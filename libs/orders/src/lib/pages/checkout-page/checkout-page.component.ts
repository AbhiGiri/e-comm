/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, Order, OrderItem, OrdersService } from '@e-comm/orders';
import { UsersService } from "@e-comm/users";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [
  ]
})
export class CheckoutPageComponent implements OnInit, OnDestroy {

  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId: string;
  countries: any = [];
  unSubscribe$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    this._initCheckoutForm();
    this._autoFillUserData();
    this._getCartItems();
    this._getCountries();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _autoFillUserData() {
    this.usersService.observeCurrentUser()
    .subscribe((user) => {   
      if(user) {
        this.userId = user['user'].id;
        this.checkoutForm.name.setValue(user['user'].name);
        this.checkoutForm.email.setValue(user['user'].email);
        this.checkoutForm.phone.setValue(user['user'].phone);
        this.checkoutForm.city.setValue(user['user'].city);
        this.checkoutForm.country.setValue(user['user'].country);
        this.checkoutForm.zip.setValue(user['user'].zip);
        this.checkoutForm.apartment.setValue(user['user'].apartment);
        this.checkoutForm.street.setValue(user['user'].street);
      }
    })
  }

  private _getCartItems() {
    const cart: any = this.cartService.getCart();
    this.orderItems = cart.items?.map((item: any) => {
      return {
        product: item.productId,
        quantity: item.quantity
      }
    })
  }
  
  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }
    console.log(this.orderItems);

     const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.street.value,
      shippingAddress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      phone: this.checkoutForm.phone.value.replace(/\D+/g, ''),
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    }

    this.orderService.catchOrderData(order);
    
    this.orderService.createCheckoutSession(this.orderItems).subscribe(error => {
      if(error) {
        console.log(`error in redirect to payment: ${error}`); 
      }
    });

  }

  ngOnDestroy() {
    this.unSubscribe$.next(true);
    this.unSubscribe$.complete();
  }

}
