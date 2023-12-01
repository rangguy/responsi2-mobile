import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
const TOKEN_KEY = 'token-saya';
const ROLE = 'rolesaya';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // Inisialisasi is auth
  // isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  constructor(private http: HttpClient) {
    this.loadToken();
    this.loadRole();
  }
  loadToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  loadRole(){
    return localStorage.getItem(ROLE);
  }

  logout() {
    localStorage.clear();
    return true;
  }
  apiURL() {
    return 'http://localhost/nilaisiswa/';
  }
}
