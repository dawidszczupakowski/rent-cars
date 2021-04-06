import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarStatusEnum } from 'src/app/enums/car-status.enum';
import { CarsWithPhotoModel } from 'src/app/models/cars.model';

@Component({
  selector: 'app-car-details-dialog',
  templateUrl: './car-details-dialog.component.html',
  styleUrls: ['./car-details-dialog.component.scss']
})
export class CarDetailsDialogComponent implements OnInit {
  car: CarsWithPhotoModel;
  carStatusEnum = CarStatusEnum;
  constructor(public dialogRef: MatDialogRef<CarDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarsWithPhotoModel) { }

  ngOnInit() {
    this.car = this.data;
  }

  close() {
    this.dialogRef.close();
  }

}
