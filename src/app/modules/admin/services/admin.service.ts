import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const baseUrl = ['http://localhost:8082'];

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http: HttpClient) { }


  postCar(data: any) {
    return this.http.post<any>(baseUrl + "/api/admin/car", data, {
      headers: this.createAuthorizationHeader()
    });
  }
  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const TOKEN_KEY = StorageService.TOKEN_KEY; // Access TOKEN_KEY from StorageService
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      return authHeaders.set('Authorization', 'Bearer ' + token);
    } else {
      return authHeaders;
    }
  }
}
