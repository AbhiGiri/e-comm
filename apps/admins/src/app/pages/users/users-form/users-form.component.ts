import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UsersService } from '@e-comm/users';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admins-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})
export class UsersFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentUserId: string;
  countries = [];
  endSubs$: Subject<any> = new Subject();

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private messageService: MessageService,
    private actRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
      this.form = this.fb.group({
        name: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        isAdmin: [false],
        street: [''],
        apartment: [''],
        zip: [''],
        city: [''],
        country: [''],
      });
  
      this._checkEditMode();
      this.countries = this.usersService.getCountries();
    }

    
  
    onSubmit() {
      this.isSubmitted = true;
      if(this.form.invalid) {
        return;
      }
      const user: User = {
        id: this.currentUserId,
        name: this.userForm.name.value,
        password: this.userForm.password.value,
        email: this.userForm.email.value,
        phone: this.userForm.phone.value,
        isAdmin: this.userForm.isAdmin.value,
        street: this.userForm.street.value,
        apartment: this.userForm.apartment.value,
        zip: this.userForm.zip.value,
        city: this.userForm.city.value,
        country: this.userForm.country.value
      }
      if(this.editMode) {
        this._updateCategory(user)
      } else {
        this._addCategory(user)
      }
    }
  
    private _updateCategory(user: User) {
      console.log(user);
      
      this.usersService.updateUser(user).pipe(takeUntil(this.endSubs$)).subscribe((user: User) => {
       console.log(user);
       
        this.messageService.add({severity:'success', summary:'Success', detail:`user ${user.name} is updated successfully...`});
        // timer(2000)
        //   .toPromise()
        //   .then((done) => {
        //     this.location.back();
        //   }) 
      },
      (() => {
        this.messageService.add({severity:'error', summary:'Error', detail:'user is not updated...'});
      })
      )
      this.router.navigate(['/users']);
    }
  
    private _addCategory(user: User) {
      this.usersService.postUser(user).pipe(takeUntil(this.endSubs$)).subscribe((user: User) => {
        this.messageService.add({severity:'success', summary:'Success', detail:`user ${user.name} is created successfully...`});
        // timer(2000)
        //   .toPromise()
        //   .then((done) => {
        //     this.location.back();
        //   })    
      },
      (() => {
        this.messageService.add({severity:'error', summary:'Error', detail:'user is not created...'});
      })
      )
      
      this.router.navigate(['/users']);
    }
  
    private _checkEditMode() {
      this.actRoute.params.pipe(takeUntil(this.endSubs$)).subscribe(param => {
        if(param.id) {
          this.editMode = true;
          this.currentUserId = param.id;
          this.usersService.getUser(param.id).pipe(takeUntil(this.endSubs$)).subscribe(data => {
            this.userForm.name.setValue(data['user'].name);
            this.userForm.email.setValue(data['user'].email);
            this.userForm.phone.setValue(data['user'].phone);
            this.userForm.isAdmin.setValue(data['user'].isAdmin);
            this.userForm.street.setValue(data['user'].street);
            this.userForm.apartment.setValue(data['user'].apartment);
            this.userForm.zip.setValue(data['user'].zip);
            this.userForm.city.setValue(data['user'].city);
            this.userForm.country.setValue(data['user'].country);
            this.userForm.password.setValidators([]);
            this.userForm.password.updateValueAndValidity();
          })
        }
      });
    }
  
    get userForm() {
      return this.form.controls;
    }

    ngOnDestroy() {
      this.endSubs$.next(true);
      this.endSubs$.complete();
    }
}
