/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LocalstorageService } from '@e-comm/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (
    private router: Router,
    private localstroageService: LocalstorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.localstroageService.getToken();
      if(token) {
        const tokenDecoded = JSON.parse(atob(token.split('.')[1]));        
        if(tokenDecoded.isAdmin && !this._tokenExpired(tokenDecoded.exp)) 
        return true;        
      }
      this.router.navigate(['login']);
      return false;
  }

  private _tokenExpired(expiration: any): boolean {
    return Math.floor(new Date().getTime()/1000) >= expiration
  }
  
}
