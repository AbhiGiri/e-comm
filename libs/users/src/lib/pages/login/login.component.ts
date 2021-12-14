/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LocalstorageService } from '@e-comm/users';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalstorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get loginFormControls () {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;
    this.authService.login(this.loginFormControls.email.value, this.loginFormControls.password.value).subscribe(user => {
      this.authError = false;
      console.log(user);
      this.localStorageService.setToken(user.token);
     
      this.router.navigate(['/']);
    }, (error: HttpErrorResponse) => {
      this.authError = true;
      if(error.status !== 400) {
        this.authMessage = 'Error in the server, please try again...'
      } else {
        this.authMessage = "Email or password is wrong."
      }
    })
    
  }

}

