import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@e-comm/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admins-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products = [];
  endSubs$: Subject<any> = new Subject();

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productsService.getProducts().pipe(takeUntil(this.endSubs$)).subscribe(products => {
      console.log(products);
      
      this.products = products;
    })
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).pipe(takeUntil(this.endSubs$)).subscribe(() => {
          this._getProducts();
          this.messageService.add({severity:'success', summary:'Success', detail:'category is deleted successfully...'});
        })
      }
    });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products-form/${productId}`)
  }

  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }
}

