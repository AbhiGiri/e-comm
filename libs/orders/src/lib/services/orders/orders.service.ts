/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { environment } from '@env/environment';
import { map, Observable, switchMap } from 'rxjs';
import { StripeService } from "ngx-stripe";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiURLOrders = environment.apiURL + 'orders';
  apiURLProduct = environment.apiURL + 'products';

  constructor(
    private http: HttpClient,
    private stripeService: StripeService) { }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.apiURLOrders}`)
  }

  getOrder(OrderId: string): Observable<Order>{
    return this.http.get<Order>(`${this.apiURLOrders}/${OrderId}`)
  }

  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLOrders}/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount))
  }

  getTotalSales() : Observable<number> {
    return this.http.get<number>(`${this.apiURLOrders}/get/totalSales`).pipe(
      map((objectValue: any) => objectValue.totalsales)
    )
  }

  postOrder(Order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiURLOrders}`, Order)
  }

  updateOrder(orderStatus: {status: string}, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStatus)
  }

  deleteOrder(OrderId: string): Observable<Order> {
    return this.http.delete<Order>(`${this.apiURLOrders}/${OrderId}`)
  }

  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURLProduct}/${productId}`)
  }

  createCheckoutSession(orderItems: OrderItem[]) {
    return  this.http.post(`${this.apiURLOrders}/create-checkout-session`, orderItems)
      .pipe(
        switchMap((session: {id: string}) => {
          return this.stripeService.redirectToCheckout({sessionId: session.id})
        })
      )
  }

  catchOrderData(order: Order) {
    localStorage.setItem('orderData', JSON.stringify(order));
  }

  getCatchedOrderData(): Order {
    return JSON.parse(localStorage.getItem('orderData'))
  }

  removeCatchedOrderData() {
    localStorage.removeItem('orderData');
  }

}
