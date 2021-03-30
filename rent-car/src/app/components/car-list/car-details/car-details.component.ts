import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsModel } from 'src/app/models/cars.model';
import { CarsService } from 'src/app/services/cars.service';
import { HelperService } from 'src/app/services/helper.service';
import { CarRentDialogComponent } from './car-rent-dialog/car-rent-dialog.component';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
})
export class CarDetailsComponent implements OnInit {
  car: CarsModel;
  constructor(
    private helperService: HelperService,
    private carsService: CarsService,
    private aRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    Promise.resolve().then(() => this.helperService.setTitle('Szczegóły'));
    this.aRoute.params.subscribe((params) => {
      this.carsService.getCar(params.id).subscribe((car: CarsModel) => {
        this.car = car;
      });
    });
  }

  openReserveCar(): void {
    const dialogRef = this.dialog.open(CarRentDialogComponent, {
      width: '30%',
      data: this.car
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        this.router.navigate(['']);
      }
    });
  }
}
