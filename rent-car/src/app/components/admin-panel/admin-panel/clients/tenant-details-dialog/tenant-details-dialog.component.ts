import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PayStatusEnum } from 'src/app/enums/pay-status.enum';
import { RentStatusEnum } from 'src/app/enums/rent-status.enum';
import { RentInfoByTenantModel } from 'src/app/models/rent-info.model';
import { TenantModel } from 'src/app/models/tenant.model';
import { RentService } from 'src/app/services/rent.service';
import { StorageService } from 'src/app/services/storage.service';
import { TenantsService } from 'src/app/services/tenants.service';

@Component({
  selector: 'app-tenant-details-dialog',
  templateUrl: './tenant-details-dialog.component.html',
  styleUrls: ['./tenant-details-dialog.component.scss']
})
export class TenantDetailsDialogComponent implements OnInit {
  tenant: TenantModel;
  rentInfo: RentInfoByTenantModel[];
  displayedColumns: string[] = ['pojazd', 'data', 'oplata', 'status'];
  dataSource: MatTableDataSource<RentInfoByTenantModel>;
  statusRent = RentStatusEnum;
  payStatusEnum = PayStatusEnum;
  edit = false;
  form: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  get imie() {
    return this.form.get('imie');
  }

  get nazwisko() {
    return this.form.get('nazwisko');
  }

  get pesel() {
    return this.form.get('pesel');
  }

  get nip() {
    return this.form.get('nip');
  }

  get numerDowoduOsobistego() {
    return this.form.get('numerDowoduOsobistego');
  }

  get adres() {
    return this.form.get('adres');
  }

  get email() {
    return this.form.get('email');
  }

  get telefon() {
    return this.form.get('telefon');
  }

  constructor(public dialogRef: MatDialogRef<TenantDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TenantModel,
    private rentService: RentService, private storageService: StorageService, private formBuilder: FormBuilder, private tenantsService: TenantsService) { }

  ngOnInit() {
    this.tenant = this.data;
    this.form = this.createForm();
    this.form.patchValue(this.tenant);
    this.rentService.getAllRentInfoByTenant(this.tenant.id, this.storageService.loggedUser).subscribe((rentInfo: RentInfoByTenantModel[]) => {
      this.rentInfo = rentInfo;
      this.dataSource = new MatTableDataSource(rentInfo.sort((x, y) => y.wypozyczenieId - x.wypozyczenieId));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  createForm() {
    return this.formBuilder.group({
      imie: ['', Validators.required],
      nazwisko: ['', Validators.required],
      pesel: ['', Validators.required],
      nip: [''],
      numerDowoduOsobistego: ['', Validators.required],
      adres: ['', Validators.required],
      telefon: ['', Validators.required],
      email: ['', Validators.email],
    });
  }

  save() {
    const tenantForSend = this.form.value as TenantModel;
    tenantForSend.id = this.tenant.id;

    this.tenantsService.editTenant(tenantForSend, this.storageService.loggedUser).subscribe((resp) => {
      this.dialogRef.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}
