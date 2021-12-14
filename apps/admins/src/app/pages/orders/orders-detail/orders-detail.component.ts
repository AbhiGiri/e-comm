import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@e-comm/orders';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admins-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit, OnDestroy {

  order: Order;
  orderStatus = [];
  selectedStatus: any;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private actRoute: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrders();
  }

  private _mapOrderStatus() {
    this.orderStatus = Object.keys(ORDER_STATUS).map(key => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      }
    })
  }

  private _getOrders() {
    this.actRoute.params.pipe(takeUntil(this.endSubs$)).subscribe(param => {
      if(param.id) {
        this.ordersService.getOrder(param.id).pipe(takeUntil(this.endSubs$)).subscribe(orders => {
          this.order = orders;
          this.selectedStatus = orders.status
        })
      }
    })
  }

  onChangeStatus(event) {
    console.log(event);
    this.ordersService.updateOrder({status: event.value}, this.order.id).pipe(takeUntil(this.endSubs$)).subscribe(order => {
      console.log(order);
      this.messageService.add({
        severity:'success', 
        summary:'Success', 
        detail:'order is updated successfully...'
      });
    },
    (() => {
      this.messageService.add({
        severity:'error', 
        summary:'Error', 
        detail:'order is not updated...'
      });
    }))
    
  }

  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

}

