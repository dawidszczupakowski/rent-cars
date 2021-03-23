import { CarStatusEnum } from '../enums/car-status.enum';

export interface CarsModel {
    id?: number;
    marka: string;
    model: string;
    rodzajSilnika: string;
    mocSilnika: string;
    pojemnoscSilnika: string;
    waga: string;
    dodatkoweInformacje: string;
    cena: number;
    status: CarStatusEnum;
    zdjecie?: any;
}
