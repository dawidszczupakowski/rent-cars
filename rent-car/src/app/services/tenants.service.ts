import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TenantModel } from '../models/tenant.model';

@Injectable({
  providedIn: 'root'
})
export class TenantsService {

  constructor(private http: HttpClient) { }

  getTenant(tenantId: number, userGuid: string): Observable<TenantModel> {
    return this.http.get<TenantModel>(`tenants/${tenantId}/${userGuid}`);
  }

  getAllTenant(userGuid: string): Observable<TenantModel[]> {
    return this.http.get<TenantModel[]>(`tenants/${userGuid}`);
  }
}
