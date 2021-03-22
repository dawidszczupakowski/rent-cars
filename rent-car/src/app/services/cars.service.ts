import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarsModel } from '../models/cars.model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  constructor(private http: HttpClient) { }

  getAllCars(): Observable<CarsModel[]> {
    return this.http.get<CarsModel[]>('cars');
  }

  getCar(id: number): Observable<CarsModel> {
    return this.http.get<CarsModel>(`cars/${id}`);
  }

  createCar(userGuid: string, newCar: CarsModel): Observable<number> {
    return this.http.post<number>(`cars/${userGuid}`, newCar);
  }

  updateCar(userGuid: string, car: CarsModel): Observable<number> {
    return this.http.put<number>(`updateCar/${userGuid}`, car);
  }
}
