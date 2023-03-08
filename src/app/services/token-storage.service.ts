import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'accessToken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return jwt_decode(token);
    } else {
      return null;
    }
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    const token = this.getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}