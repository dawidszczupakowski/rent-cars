import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarStatusEnum } from 'src/app/enums/car-status.enum';
import { CarsModel, CarsWithPhotoModel } from 'src/app/models/cars.model';
import { CarsService } from 'src/app/services/cars.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-active-desactive-car-dialog',
  templateUrl: './active-desactive-car-dialog.component.html',
  styleUrls: ['./active-desactive-car-dialog.component.scss']
})
export class ActiveDesactiveCarDialogComponent implements OnInit {
  carDetail: CarsWithPhotoModel;
  carStatusEnum = CarStatusEnum;
  constructor(
    public dialogRef: MatDialogRef<ActiveDesactiveCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarsWithPhotoModel,
    private storageService: StorageService,
    private carsService: CarsService) { }

  ngOnInit() {
    this.carDetail = this.data;
  }

  submit() {
    const car = this.data as CarsModel;
    
    this.carsService.updateCar(this.storageService.loggedUser, car).subscribe
  }

  close() {
    this.dialogRef.close();
  }
}
