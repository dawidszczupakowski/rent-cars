import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CarsModel } from 'src/app/models/cars.model';
import { CarsService } from 'src/app/services/cars.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  carsList: CarsModel[] = [];
  constructor(private helperService: HelperService, private carsService: CarsService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.helperService.setTitle('Dostępne samochody');
    this.getCars();
  }

  getCars(): void {
    this.carsService.getAllCars().subscribe((cars: CarsModel[]) => {
      cars.forEach(car => {
        car.zdjecie = JSON.parse('[' + car.zdjecie + ']');
      });
      this.carsList = cars;
    });
  }

}
