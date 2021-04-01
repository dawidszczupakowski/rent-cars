import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarsModel, CarsWithPhotoModel } from '../models/cars.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  cars: CarsModel[];
  constructor(private http: HttpClient) { }

  getAllCars(): Observable<CarsWithPhotoModel[]> {
    return this.http.get<ResponseModel<CarsWithPhotoModel[]>>('cars').pipe(
      map((response) => response.result),
      map((cars) => {
        cars.forEach((car) => {
          car.blob = JSON.parse('[' + car.blob + ']');
        });
        return cars;
      })
    );
  }

  getCar(id: number): Observable<CarsWithPhotoModel> {
    return this.http.get<ResponseModel<CarsWithPhotoModel>>(`cars/${id}`).pipe(
      map((response) => response.result),
      map((car) => {
        car.blob = JSON.parse('[' + car.blob + ']');
        return car;
      })
    );
  }

  createCar(userGuid: string, newCar: CarsModel): Observable<number> {
    return this.http
      .post<ResponseModel<number>>(`cars/${userGuid}`, newCar)
      .pipe(map((response) => response.result));
  }

  updateCar(userGuid: string, car: CarsModel): Observable<number> {
    return this.http
      .put<ResponseModel<number>>(`updateCar/${userGuid}`, car)
      .pipe(map((response) => response.result));
  }
}
