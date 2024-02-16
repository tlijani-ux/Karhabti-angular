import { Injectable } from '@angular/core';


const USER_KEY = 'auth-user';
const TOKEN_KEY = 'auth-token';



@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  static saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  static setUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }


  static getToken() {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  static getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }


  static getUserRole(): string {
    const user = this.getUser();
    return user.role;
  }

  static isAdminLoggedIn(): boolean {

    if (this.getToken == null) return false;
    const role: string = this.getUserRole();
    return role == 'ADMIN';

  }

  static isCustomerLoggedIn(): boolean {
    if (this.getToken == null) return false;
    const role: string = this.getUserRole();
    return role == 'CUSTOMER';
  }
}
