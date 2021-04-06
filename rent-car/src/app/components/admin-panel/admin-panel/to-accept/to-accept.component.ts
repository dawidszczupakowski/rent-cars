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
import { ConfirmRentComponent } from './confirm-rent/confirm-rent.component';
import { RejectRentComponent } from '../shared/reject-rent/reject-rent.component';

@Component({
  selector: 'app-to-accept',
  templateUrl: './to-accept.component.html',
  styleUrls: ['./to-accept.component.scss']
})
export class ToAcceptComponent implements OnInit {
  displayedColumns: string[] = ['imieNazwisko', 'pesel', 'pojazd', 'data', 'oplata', 'akcje'];
  dataSource: MatTableDataSource<RentInfoModel>;
  statusRent = RentStatusEnum;
  payStatusEnum = PayStatusEnum;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private rentService: RentService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.rentService.getAllRentInfo(this.storageService.loggedUser).subscribe((resp: RentInfoModel[]) => {
      this.rentService.rentInfo.next(resp);
      resp = resp.filter(x => x.statusWypozyczenia === this.statusRent.doAkceptacji).sort((x, y) => y.wypozyczenieId - x.wypozyczenieId);
      this.dataSource = new MatTableDataSource(resp);
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

  accept(row: RentInfoModel) {
    const dialogRef = this.dialog.open(ConfirmRentComponent, {
      width: '40%',
      maxHeight: '90%',
      data: row
    });

    this.afterCloseDialogs(dialogRef);
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
        this.rentService.rentInfo.next(resp);
        resp = resp.filter(x => x.statusWypozyczenia === this.statusRent.doAkceptacji).sort((x, y) => y.wypozyczenieId - x.wypozyczenieId);
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    })
  }
}
