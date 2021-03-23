import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarsModel } from '../models/cars.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  constructor(private http: HttpClient) { }

  getAllCars(): Observable<CarsModel[]> {
    return this.http.get<ResponseModel<CarsModel[]>>('cars').pipe(map(response => response.result));
  }

  getCar(id: number): Observable<CarsModel> {
    return this.http.get<ResponseModel<CarsModel>>(`cars/${id}`).pipe(map(response => response.result));
  }

  createCar(userGuid: string, newCar: CarsModel): Observable<number> {
    return this.http.post<ResponseModel<number>>(`cars/${userGuid}`, newCar).pipe(map(response => response.result));
  }

  updateCar(userGuid: string, car: CarsModel): Observable<number> {
    return this.http.put<ResponseModel<number>>(`updateCar/${userGuid}`, car).pipe(map(response => response.result));
  }
}
