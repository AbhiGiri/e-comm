import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@e-comm/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admins-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];
  endSubs$: Subject<any> = new Subject();
  
  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
    ) { }

  ngOnInit(): void {
   this.refreshCategoryList();
  }

  refreshCategoryList() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(cats => {
      this.categories = cats
    });
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).pipe(takeUntil(this.endSubs$)).subscribe(() => {
          this.refreshCategoryList();
          this.messageService.add({severity:'success', summary:'Success', detail:'category is deleted successfully...'});
        })
      }
    });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories-form/${categoryId}`)
  }

  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

}