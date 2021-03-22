export interface RentModel {
    id?: number;
    idPojazdu: number;
    wypozyczenieOd: Date;
    wypozyczenieDo: Date;
    najemcaId: number;
}
