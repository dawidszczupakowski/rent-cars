import { TenantModel } from './tenant.model';

export interface RentModel {
    id?: number;
    idPojazdu: number;
    wypozyczenieOd: Date;
    wypozyczenieDo: Date;
    najemcaId?: number;
}

export interface RentNewCarModel extends RentModel {
    tenant: TenantModel;
}