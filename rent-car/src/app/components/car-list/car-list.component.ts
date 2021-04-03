import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CarStatusEnum } from 'src/app/enums/car-status.enum';
import { CarsModel, CarsWithPhotoModel } from 'src/app/models/cars.model';
import { CarsService } from 'src/app/services/cars.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  carsList: CarsModel[] = [];
  zdjecia: string[][] = [];
  statusEnum = CarStatusEnum;
  carsExist = false;
  carsListLength = 0;
  minIndex = 0;
  maxIndex = 5;

  constructor(
    private helperService: HelperService,
    private carsService: CarsService,
    public sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.helperService.setTitle('Dostępne samochody');
    this.getCars();
  }

  getCars(): void {
    this.carsService.getAllCars().subscribe((cars: CarsWithPhotoModel[]) => {
      this.carsList = cars;
      this.carsService.cars = cars;
      for (const car of cars) {
        this.carsExist = this.carsExist || car.status === this.statusEnum.wolny;
        if (car.status === this.statusEnum.wolny) {
          this.carsListLength++;
        }
      }
    });
  }

  goToCarDetails(id: number): void {
    this.router.navigate([`car-detail/${id}`]);
  }

  paginatorChange(event: PageEvent) {
    this.minIndex = event.pageSize * event.pageIndex;
    this.maxIndex = this.minIndex + event.pageSize - 1;
  }
}
