import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@e-comm/orders';
import { ProductsService } from '@e-comm/products';
import { UsersService } from '@e-comm/users';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admins-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  endSubs$: Subject<any> = new Subject();
  statistic = [];
  
  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productsService.getProductsCount(),
      this.usersService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).pipe(takeUntil(this.endSubs$)).subscribe(values => {
      console.log(values);
      this.statistic = values;
    })
  }

  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

}
