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
    @Inject(MAT_DIALOG_DATA) public data: { car: CarsWithPhotoModel, status: CarStatusEnum },
    private storageService: StorageService,
    private carsService: CarsService) { }

  ngOnInit() {
    this.carDetail = this.data.car;
  }

  submit() {
    const car = this.data.car as CarsModel;
    car.status = this.data.status;
    delete car['blob'];
    
    this.carsService.updateCar(this.storageService.loggedUser, car).subscribe((x) => {
      this.dialogRef.close();
    }, () => this.dialogRef.close());
  }

  close() {
    this.dialogRef.close();
  }
}
