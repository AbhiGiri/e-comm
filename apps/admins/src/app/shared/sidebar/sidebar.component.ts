import { Component, OnInit } from '@angular/core';
import { AuthService } from "@e-comm/users";

@Component({
  selector: 'admins-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  constructor(
    private authService: AuthService
  ) { }

  logoutUser() {
    this.authService.logout();
  }

}
