import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@e-comm/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admins-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getUsers();
  }

  private _getUsers() {
    this.usersService.getUsers().pipe(takeUntil(this.endSubs$)).subscribe((users) => {
      console.log(users['usersList']);
      this.users = users['usersList'];
    })
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).pipe(takeUntil(this.endSubs$)).subscribe(() => {
          this._getUsers();
          this.messageService.add({severity:'success', summary:'Success', detail:'user is deleted successfully...'});
        })
      }
    });
  }

  updateUser(userId: string) {
    this.router.navigateByUrl(`users-form/${userId}`)
  }

  getCountryName(countryKey: string) {
    if(countryKey) {
       this.usersService.getCountry(countryKey);
    }
  }

  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }
}
