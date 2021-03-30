import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.carsService.getAllCars().subscribe((cars: CarsModel[]) => {
      this.carsList = cars;
      this.carsService.cars = cars;
    });
  }

  goToCarDetails(id: number): void {
    console.log(id);
    this.router.navigate([`cars-list/car-detail/${id}`]);
  }
}
