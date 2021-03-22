import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminModel, LoginModel, LoginSuccessModel } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  userGuid: string;

  constructor(private http: HttpClient) { }

  login(credential: LoginModel): Observable<LoginSuccessModel> {
    return this.http.post<LoginSuccessModel>('login', credential);
  }

  createAdmin(userGuid: string, admin: AdminModel): Observable<number> {
    return this.http.post<number>(`admin/${userGuid}`, admin);
  }

  logout(userGuid: string): Observable<any> {
    return this.http.get<any>(`logout/${userGuid}`);
  }
}
