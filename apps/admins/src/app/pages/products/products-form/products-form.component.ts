import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService, Product, ProductsService } from '@e-comm/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admins-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentProductId: string;
  categories = [];
  imageDisplay:  string | ArrayBuffer;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private fb: FormBuilder,
    private ProductsService: ProductsService,
    private router: Router,
    private messageService: MessageService,
    private actRoute: ActivatedRoute,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {  
    this._initForm();
    this._getCategories();
  }

  private _initForm() {
   this.form = this.fb.group({
     name: ["", Validators.required],
     brand: ["", Validators.required],
     category: ["", Validators.required],
     price: ["", Validators.required],
     countInStock: ["", Validators.required],
     description: ["", Validators.required],
     richDescription: [""],
     image: ["", Validators.required],
     isFeatured: [false],
    })

    this._checkEditMode();
  }

  private _getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(categories => {
      this.categories = categories;
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.form.invalid) {
      return;
    }

    const productFormData = new FormData();
    Object.keys(this.productForm).map(key => {
      productFormData.append(key, this.productForm[key].value)
    })
    
    if(this.editMode) {
      this._updateProduct(productFormData, this.currentProductId)
    } else {
      this._addProduct(productFormData)
    }
  }

  private _updateProduct(productData: FormData, productId) {
    this.ProductsService.updateProduct(productData, productId).pipe(takeUntil(this.endSubs$)).subscribe((product: Product) => {
     
      this.messageService.add({severity:'success', summary:'Success', detail:`product ${product.name} is updated successfully...`});
      // timer(2000)
      //   .toPromise()
      //   .then((done) => {
      //     this.location.back();
      //   }) 
    },
    (() => {
      this.messageService.add({severity:'error', summary:'Error', detail:`product is not updated...`});
    })
    )
    this.router.navigate(['/products']);
  }

  private _addProduct(productFormData: FormData) {
    this.ProductsService.postProduct(productFormData).pipe(takeUntil(this.endSubs$)).subscribe((product: Product) => {
      this.messageService.add({severity:'success', summary:'Success', detail:`product ${product.name} is created successfully...`});
      // timer(2000)
      //   .toPromise()
      //   .then((done) => {
      //     this.location.back();
      //   })    
    },
    (() => {
      this.messageService.add({severity:'error', summary:'Error', detail:'product is not created...'});
    })
    )
    
    this.router.navigate(['/products']);
  }

  private _checkEditMode() {
    this.actRoute.params.pipe(takeUntil(this.endSubs$)).subscribe(param => {
      if(param.id) {
        this.editMode = true;
        this.currentProductId = param.id;
        this.ProductsService.getProduct(param.id).pipe(takeUntil(this.endSubs$)).subscribe(data => {
          this.productForm.name.setValue(data['product'].name);
          this.productForm.brand.setValue(data['product'].brand);
          this.productForm.category.setValue(data['product'].category.id);
          this.productForm.price.setValue(data['product'].price);
          this.productForm.countInStock.setValue(data['product'].countInStock);
          this.productForm.description.setValue(data['product'].description);
          this.productForm.richDescription.setValue(data['product'].richDescription);
          // this.productForm.image.setValue(data['product'].image);
          this.productForm.isFeatured.setValue(data['product'].isFeatured);
          this.imageDisplay = data['product'].image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        })
      }
    });
  }


  get productForm() {
    return this.form.controls;
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if(file) {
      const fileReader = new FileReader();
      this.form.patchValue({image: file});
      this.form.get('image').updateValueAndValidity();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result
      }
      fileReader.readAsDataURL(file);
    }
  }

  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

}
