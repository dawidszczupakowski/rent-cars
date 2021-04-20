import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RentInfoByTenantModel, RentInfoModel } from '../models/rent-info.model';
import { RentModel, RentNewCarModel } from '../models/rent.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  rentInfo: BehaviorSubject<RentInfoModel[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  addRent(rent: RentNewCarModel): Observable<any> {
    return this.http.post<any>(`rent`, rent);
  }

  getRent(rentId: number, userGuid: string): Observable<RentModel> {
    return this.http.get<RentModel>(`rent/${rentId}/${userGuid}`);
  }

  getAllRent(userGuid: string): Observable<RentModel[]> {
    return this.http.get<RentModel[]>(`rent/${userGuid}`);
  }

  updateRent(userGuid: string, rent: RentModel): Observable<number> {
    return this.http.post<number>(`rent/${userGuid}`, rent);
  }

  getAllRentInfo(userGuid: string): Observable<RentInfoModel[]> {
    return this.http.get<ResponseModel<RentInfoModel[]>>(`getAllRentInfo/${userGuid}`).pipe(
      map(resp => resp.result)
    );
  }

  getAllRentInfoByTenant(tenantId: number, userGuid: string): Observable<RentInfoByTenantModel[]> {
    return this.http.get<ResponseModel<RentInfoByTenantModel[]>>(`getAllRentInfoByTenant/${tenantId}/${userGuid}`).pipe(
      map(resp => resp.result)
    );
  }
}
