import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TenantModel } from 'src/app/models/tenant.model';
import { StorageService } from 'src/app/services/storage.service';
import { TenantsService } from 'src/app/services/tenants.service';
import { TenantDetailsDialogComponent } from './tenant-details-dialog/tenant-details-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = ['imieNazwisko', 'pesel', 'nip', 'dowodOsobisty', 'adres', 'telefonEmail'];
  dataSource: MatTableDataSource<TenantModel>;
  dataList: TenantModel[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private tenantService: TenantsService, private storageService: StorageService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.tenantService.getAllTenant(this.storageService.loggedUser).subscribe((tenants: TenantModel[]) => {
      this.setList(tenants);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  tenantDetails(row: TenantModel) {
    const dialogRef = this.dialog.open(TenantDetailsDialogComponent, {
      width: '50%',
      maxHeight: '90%',
      data: row
    });

    dialogRef.afterClosed().subscribe((x) => {
      this.tenantService.getAllTenant(this.storageService.loggedUser).subscribe((tenants: TenantModel[]) => {
        this.setList(tenants);
      });
    });
  }

  private setList(tenants: TenantModel[]) {
    this.dataList = tenants;
    this.dataSource = new MatTableDataSource(this.dataList.sort((x, y) => y.id - x.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
