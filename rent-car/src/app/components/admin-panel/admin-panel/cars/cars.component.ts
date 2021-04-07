import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CarStatusEnum } from 'src/app/enums/car-status.enum';
import { CarsModel, CarsWithPhotoModel } from 'src/app/models/cars.model';
import { CarsService } from 'src/app/services/cars.service';
import { StorageService } from 'src/app/services/storage.service';
import { AddCarDialogComponent } from './add-car-dialog/add-car-dialog.component';
import { CarDetailsDialogComponent } from './car-details-dialog/car-details-dialog.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  displayedColumns: string[] = ['model', 'marka', 'cena', 'status', 'akcje'];
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
    private storageService: StorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.carsService.getAllCars().subscribe((cars: CarsWithPhotoModel[]) => {
      this.dataList = cars.sort((x, y) => y.id - x.id);
      this.dataSource = new MatTableDataSource(this.dataList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  deasctiveCar(row: CarsWithPhotoModel) {
    // const dialogRef = this.dialog.open(RejectRentComponent, {
    //   width: '30%',
    //   maxHeight: '90%',
    //   data: row
    // });

    // this.afterCloseDialogs(dialogRef);
  }

  activeCar(row: CarsWithPhotoModel) {
    // const dialogRef = this.dialog.open(RejectRentComponent, {
    //   width: '30%',
    //   maxHeight: '90%',
    //   data: row
    // });

    // this.afterCloseDialogs(dialogRef);
  }

  edit(row: CarsWithPhotoModel) {
    // const dialogRef = this.dialog.open(RejectRentComponent, {
    //   width: '30%',
    //   maxHeight: '90%',
    //   data: row
    // });

    // this.afterCloseDialogs(dialogRef);
  }

  private afterCloseDialogs(dialog) {
    // dialog.afterClosed().subscribe(() => {
    //   this.rentService.getAllRentInfo(this.storageService.loggedUser).subscribe((resp: RentInfoModel[]) => {
    //     this.dataList = resp;
    //     resp = resp.filter(x => x.statusWypozyczenia !== this.statusRent.doAkceptacji).sort((x, y) => y.wypozyczenieId - x.wypozyczenieId);
    //     this.dataSource = new MatTableDataSource(resp);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //     this.currStatusWyp = "Wszystkie";
    //   });
    // })
  }

  addCar() {
    const dialogRef = this.dialog.open(AddCarDialogComponent, {
      width: '30%',
      maxHeight: '90%'
    });

    dialogRef.afterClosed().subscribe((car: CarsModel) => {
      this.carsService.createCar(this.storageService.loggedUser, car).subscribe(resp => {
        this.carsService.getAllCars().subscribe((cars: CarsWithPhotoModel[]) => {
          dialogRef.close(cars);
        })
      })
    })
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
}
