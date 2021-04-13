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
    blobId: number;
}

export interface CarsWithPhotoModel extends CarsModel {
    blob: string[];
}

export interface CarsWithPhotoModelResponse extends CarsModel {
    blob: string;
}
