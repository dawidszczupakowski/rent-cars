import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CarsModel } from 'src/app/models/cars.model';
import { CarsService } from 'src/app/services/cars.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  displayedColumns: string[] = ['imieNazwisko', 'pojazd', 'data', 'oplata', 'status', 'akcje'];
  dataSource: MatTableDataSource<CarsModel>;
  currStatusWyp = "Wszystkie";
  dataList: CarsModel[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private carsService: CarsService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  details(row: CarsModel) {
    // const dialogRef = this.dialog.open(ConfirmRentComponent, {
    //   width: '40%',
    //   maxHeight: '90%',
    //   data: row
    // });

    // this.afterCloseDialogs(dialogRef);
  }

  reject(row: CarsModel) {
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
}
