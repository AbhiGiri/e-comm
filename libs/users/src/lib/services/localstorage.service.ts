import { Injectable } from '@angular/core';

 const Token = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setToken(data: any) {
    localStorage.setItem(Token, data);
  }

  getToken() {
    return localStorage.getItem(Token);
  }

  removeToken() {
    localStorage.removeItem(Token);
  }

  isValidToken() {
    const token = this.getToken();
    if(token) {
      const tokenDecoded = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenExpired(tokenDecoded);
    } return false;
  }

  getUserIdFromToken() {
    const token = this.getToken();
    if(token) {
      const tokenDecoded = JSON.parse(atob(token.split('.')[1]));
      if(tokenDecoded) {
        return tokenDecoded.userId;
      } else {
          return null;
        }
    } else {
      return null;
    }
  }


  private _tokenExpired(expiration: any): boolean {
    return Math.floor(new Date().getTime()/1000) > expiration;
  }

  
}
