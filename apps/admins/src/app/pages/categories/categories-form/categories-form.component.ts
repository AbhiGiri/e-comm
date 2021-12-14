import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService, Category } from '@e-comm/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admins-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId: string;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoriesService,
    private router: Router,
    private messageService: MessageService,
    private location: Location,
    private actRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff222']
    });

    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.form.invalid) {
      return;
    }
    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    }
    if(this.editMode) {
      this._updateCategory(category)
    } else {
      this._addCategory(category)
    }
  }

  private _updateCategory(category: Category) {
    this.categoryService.updateCategory(category).pipe(takeUntil(this.endSubs$)).subscribe(() => {
     
      this.messageService.add({severity:'success', summary:'Success', detail:'category is updated successfully...'});
      // timer(2000)
      //   .toPromise()
      //   .then((done) => {
      //     this.location.back();
      //   }) 
    },
    (() => {
      this.messageService.add({severity:'error', summary:'Error', detail:'category is not updated...'});
    })
    )
    this.router.navigate(['/categories']);
  }

  private _addCategory(category: Category) {
    this.categoryService.postCategory(category).pipe(takeUntil(this.endSubs$)).subscribe(() => {
      this.messageService.add({severity:'success', summary:'Success', detail:'category is created successfully...'});
      // timer(2000)
      //   .toPromise()
      //   .then((done) => {
      //     this.location.back();
      //   })    
    },
    (() => {
      this.messageService.add({severity:'error', summary:'Error', detail:'category is not created...'});
    })
    )
    
    this.router.navigate(['/categories']);
  }

  private _checkEditMode() {
    this.actRoute.params.subscribe(param => {
      if(param.id) {
        this.editMode = true;
        this.currentCategoryId = param.id;
        this.categoryService.getCategory(param.id).pipe(takeUntil(this.endSubs$)).subscribe(data => {
          this.categoryForm.name.setValue(data['category'].name);
          this.categoryForm.icon.setValue(data['category'].icon);
          this.categoryForm.color.setValue(data['category'].color);
        })
      }
    });
  }

  get categoryForm() {
    return this.form.controls;
  }

  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();

  }

}

