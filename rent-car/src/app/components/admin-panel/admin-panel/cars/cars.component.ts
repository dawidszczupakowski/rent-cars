import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CarStatusEnum } from 'src/app/enums/car-status.enum';
import { CarsModel, CarsWithPhotoModel } from 'src/app/models/cars.model';
import { CarsService } from 'src/app/services/cars.service';
import { StorageService } from 'src/app/services/storage.service';
import { ActiveDesactiveCarDialogComponent } from './active-desactive-car-dialog/active-desactive-car-dialog.component';
import { AddEditCarDialogComponent } from './add-edit-car-dialog/add-edit-car-dialog.component';
import { CarDetailsDialogComponent } from './car-details-dialog/car-details-dialog.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  displayedColumns: string[] = ['marka', 'model', 'numerRejestracyjny', 'cena', 'status', 'akcje'];
  dataSource: MatTableDataSource<CarsWithPhotoModel>;
  carStatusEnum = CarStatusEnum;
  currStatusPojazd = "Wszystkie";
  statusWyp: { status: CarStatusEnum, name: string }[] = [{
    status: this.carStatusEnum.wolny,
    name: 'Wolne'
  },
  {
    status: this.carStatusEnum.wypozyczony,
    name: 'Wypożyczone'
  },
  {
    status: this.carStatusEnum.zarezerwowany,
    name: 'Zarezerwowane'
  },
  {
    status: this.carStatusEnum.nieaktywny,
    name: 'Nieaktywne'
  }];
  dataList: CarsWithPhotoModel[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private carsService: CarsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.carsService.cars.subscribe((cars: CarsWithPhotoModel[]) => {
      this.setList(cars);
    });
    this.carsService.getAllCars().subscribe((cars: CarsWithPhotoModel[]) => {
      this.setList(cars);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  details(row: CarsWithPhotoModel) {
    this.dialog.open(CarDetailsDialogComponent, {
      width: '60%',
      maxHeight: '90%',
      data: row
    });
  }

  desactiveCar(row: CarsWithPhotoModel) {
    const dialogRef = this.dialog.open(ActiveDesactiveCarDialogComponent, {
      width: '30%',
      maxHeight: '90%',
      data: { car: row, status: this.carStatusEnum.nieaktywny }
    });

    this.carsService.afterCloseDialogs(dialogRef);
  }

  activeCar(row: CarsWithPhotoModel) {
    const dialogRef = this.dialog.open(ActiveDesactiveCarDialogComponent, {
      width: '30%',
      maxHeight: '90%',
      data: { car: row, status: this.carStatusEnum.wolny }
    });

    this.carsService.afterCloseDialogs(dialogRef);
  }

  edit(row: CarsWithPhotoModel) {
    const dialogRef = this.dialog.open(AddEditCarDialogComponent, {
      width: '60%',
      maxHeight: '90%',
      data: row
    });

    this.carsService.afterCloseDialogs(dialogRef);
  }

  addCar() {
    const dialogRef = this.dialog.open(AddEditCarDialogComponent, {
      width: '60%',
      maxHeight: '90%'
    });

    this.carsService.afterCloseDialogs(dialogRef);
  }

  onChangeSelection(selected) {
    if (selected.value?.status) {
      this.dataSource = new MatTableDataSource(this.dataList.filter(x => x.status === selected.value.status).sort((x, y) => y.id - x.id));
    } else {
      this.dataSource = new MatTableDataSource(this.dataList.sort((x, y) => y.id - x.id));
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.currStatusPojazd = selected.value;
  }

  private setList(cars: CarsWithPhotoModel[]) {
    this.dataList = cars;
    this.dataSource = new MatTableDataSource(this.dataList.sort((x, y) => y.id - x.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
