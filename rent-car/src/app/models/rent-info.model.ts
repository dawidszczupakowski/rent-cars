import { CarsModel } from './cars.model';
import { RentModel } from './rent.model';
import { TenantModel } from './tenant.model';

export interface RentInfoModel extends CarsModel, TenantModel, RentModel { }
