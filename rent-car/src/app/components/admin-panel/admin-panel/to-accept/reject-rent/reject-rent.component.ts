import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RentStatusEnum } from 'src/app/enums/rent-status.enum';
import { RentInfoModel } from 'src/app/models/rent-info.model';
import { RentModel } from 'src/app/models/rent.model';
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
  constructor(
    public dialogRef: MatDialogRef<RejectRentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RentInfoModel,
    private rentService: RentService,
    private storageService: StorageService) { }

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
      id: this.data.id,
      najemcaId: this.data.najemcaId
    } as RentModel;

    this.rentService.updateRent(this.storageService.loggedUser, rentToSend).subscribe((x) => {
      this.dialogRef.close();
    })
  }

  close() {
    this.dialogRef.close();
  }
}
