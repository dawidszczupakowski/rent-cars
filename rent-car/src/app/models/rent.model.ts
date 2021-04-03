import { PayStatusEnum } from '../enums/pay-status.enum';
import { RentStatusEnum } from '../enums/rent-status.enum';
import { CarsModel } from './cars.model';
import { TenantModel } from './tenant.model';

export interface RentModel {
    id?: number;
    idPojazdu: number;
    wypozyczenieOd: Date;
    wypozyczenieDo: Date;
    najemcaId?: number;
    oplacone: PayStatusEnum;
    statusWypozyczenia: RentStatusEnum;
}

export interface RentNewCarModel {
    rentDetails: RentModel;
    tenant: TenantModel;
    car: CarsModel;
}
