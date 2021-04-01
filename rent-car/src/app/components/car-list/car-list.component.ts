import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CarStatusEnum } from 'src/app/enums/car-status.enum';
import { BlobModel } from 'src/app/models/blob.model';
import { CarsModel, CarsWithPhotoModel } from 'src/app/models/cars.model';
import { BlobService } from 'src/app/services/blob.service';
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
  constructor(
    private helperService: HelperService,
    private carsService: CarsService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private blobService: BlobService
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
      }
    });
  }

  goToCarDetails(id: number): void {
    this.router.navigate([`cars-list/car-detail/${id}`]);
  }
}
