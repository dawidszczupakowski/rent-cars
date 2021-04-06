import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PayStatusEnum } from 'src/app/enums/pay-status.enum';
import { RentStatusEnum } from 'src/app/enums/rent-status.enum';
import { RentInfoModel } from 'src/app/models/rent-info.model';
import { RentService } from 'src/app/services/rent.service';
import { StorageService } from 'src/app/services/storage.service';
import { ConfirmRentComponent } from '../to-accept/confirm-rent/confirm-rent.component';
import { RejectRentComponent } from '../shared/reject-rent/reject-rent.component';
import { EndRentDialogComponent } from '../shared/end-rent-dialog/end-rent-dialog.component';
import { DetailsDialogComponent } from '../shared/details-dialog/details-dialog.component';

@Component({
  selector: 'app-rented',
  templateUrl: './rented.component.html',
  styleUrls: ['./rented.component.scss']
})
export class RentedComponent implements OnInit {
  displayedColumns: string[] = ['imieNazwisko', 'pojazd', 'data', 'oplata', 'status', 'akcje'];
  dataSource: MatTableDataSource<RentInfoModel>;
  statusRent = RentStatusEnum;
  payStatusEnum = PayStatusEnum;
  statusWyp: { status: RentStatusEnum, name: string }[] = [{
    status: this.statusRent.anulowane,
    name: 'Anulowane'
  },
  {
    status: this.statusRent.wypozyczone,
    name: 'Wypożyczone'
  },
  {
    status: this.statusRent.zakonczone,
    name: 'Zakończone'
  }];
  currStatusWyp = "Wszystkie";
  dataList: RentInfoModel[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private rentService: RentService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.rentService.getAllRentInfo(this.storageService.loggedUser).subscribe((resp: RentInfoModel[]) => {
      this.dataList = resp;
      resp = resp.filter(x => x.statusWypozyczenia !== this.statusRent.doAkceptacji).sort((x, y) => y.wypozyczenieId - x.wypozyczenieId);
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.rentService.rentInfo.subscribe((rent: RentInfoModel[]) => {
      if (rent) {
        this.dataList = rent;
        this.dataSource = new MatTableDataSource(this.dataList.filter(x => x.statusWypozyczenia !== this.statusRent.doAkceptacji).sort((x, y) => y.wypozyczenieId - x.wypozyczenieId));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.currStatusWyp = "Wszystkie";
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  details(row: RentInfoModel) {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: '40%',
      maxHeight: '90%',
      data: row
    });
  }

  reject(row: RentInfoModel) {
    const dialogRef = this.dialog.open(RejectRentComponent, {
      width: '30%',
      maxHeight: '90%',
      data: row
    });

    this.afterCloseDialogs(dialogRef);
  }

  private afterCloseDialogs(dialog) {
    dialog.afterClosed().subscribe(() => {
      this.rentService.getAllRentInfo(this.storageService.loggedUser).subscribe((resp: RentInfoModel[]) => {
        this.dataList = resp;
        resp = resp.filter(x => x.statusWypozyczenia !== this.statusRent.doAkceptacji).sort((x, y) => y.wypozyczenieId - x.wypozyczenieId);
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.currStatusWyp = "Wszystkie";
      });
    })
  }

  endRent(row: RentInfoModel) {
    const dialogRef = this.dialog.open(EndRentDialogComponent, {
      width: '40%',
      maxHeight: '90%',
      data: row
    });

    this.afterCloseDialogs(dialogRef);
  }

  onChangeSelection(selected) {
    if (selected.value?.status) {
      this.dataSource = new MatTableDataSource(this.dataList.filter(x => x.statusWypozyczenia === selected.value.status).sort((x, y) => y.wypozyczenieId - x.wypozyczenieId));
    } else {
      this.dataSource = new MatTableDataSource(this.dataList.filter(x => x.statusWypozyczenia !== this.statusRent.doAkceptacji).sort((x, y) => y.wypozyczenieId - x.wypozyczenieId));
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.currStatusWyp = selected.value;
  }
}
