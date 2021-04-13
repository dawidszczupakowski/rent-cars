import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarStatusEnum } from 'src/app/enums/car-status.enum';
import { RentStatusEnum } from 'src/app/enums/rent-status.enum';
import { CarsModel } from 'src/app/models/cars.model';
import { RentInfoModel } from 'src/app/models/rent-info.model';
import { RentModel } from 'src/app/models/rent.model';
import { CarsService } from 'src/app/services/cars.service';
import { RentService } from 'src/app/services/rent.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-reject-rent',
  templateUrl: './reject-rent.component.html',
  styleUrls: ['./reject-rent.component.scss']
})
export class RejectRentComponent implements OnInit {
  rentInfo: RentInfoModel;
  statusWyp = RentStatusEnum;
  carStatusEnum = CarStatusEnum;
  constructor(
    public dialogRef: MatDialogRef<RejectRentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RentInfoModel,
    private rentService: RentService,
    private storageService: StorageService,
    private carsService: CarsService) { }

  ngOnInit() {
    this.rentInfo = this.data;
  }

  reject() {
    const rentToSend = {
      idPojazdu: this.data.idPojazdu,
      oplacone: this.data.oplacone,
      statusWypozyczenia: this.statusWyp.anulowane,
      wypozyczenieDo: this.data.wypozyczenieDo,
      wypozyczenieOd: this.data.wypozyczenieOd,
      id: this.data.wypozyczenieId,
      najemcaId: this.data.najemcaId
    } as RentModel;

    const car = {
      id: this.data.idPojazdu,
      blobId: this.data.blobId,
      cena: this.data.cena,
      dodatkoweInformacje: this.data.dodatkoweInformacje,
      marka: this.data.marka,
      mocSilnika: this.data.mocSilnika,
      model: this.data.model,
      pojemnoscSilnika: this.data.pojemnoscSilnika,
      rodzajSilnika: this.data.rodzajSilnika,
      status: this.carStatusEnum.wolny,
      waga: this.data.waga
    } as CarsModel;
    
    this.rentService.updateRent(this.storageService.loggedUser, rentToSend).subscribe((x) => {
      this.carsService.updateCar(this.storageService.loggedUser, car).subscribe((x) => {
        this.dialogRef.close();
      })
    }, () => this.dialogRef.close())
  }

  close() {
    this.dialogRef.close();
  }
}
