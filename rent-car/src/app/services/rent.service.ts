import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentModel } from '../models/rent.model';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private http: HttpClient) { }

  addRent(carId: number, rent: RentModel): Observable<any> {
    return this.http.post<any>(`rent/${carId}`, rent);
  }

  getRent(rentId: number, userGuid: string): Observable<RentModel> {
    return this.http.get<RentModel>(`rent/${rentId}/${userGuid}`);
  }

  getAllRent(userGuid: string): Observable<RentModel[]> {
    return this.http.get<RentModel[]>(`rent/${userGuid}`);
  }

  updateRent(userGuid: string, rent: RentModel): Observable<number> {
    return this.http.put<number>(`rent/${userGuid}`, rent);
  }
}