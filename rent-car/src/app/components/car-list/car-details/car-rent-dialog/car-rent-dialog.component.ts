import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarStatusEnum } from 'src/app/enums/car-status.enum';
import { CarsModel } from 'src/app/models/cars.model';
import { RentNewCarModel } from 'src/app/models/rent.model';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-car-rent-dialog',
  templateUrl: './car-rent-dialog.component.html',
  styleUrls: ['./car-rent-dialog.component.scss'],
})
export class CarRentDialogComponent implements OnInit {
  car: CarsModel;
  form: FormGroup;
  minDate: Date = new Date();
  maxDate: Date = new Date(this.minDate.getFullYear(), this.minDate.getMonth() + 1, this.minDate.getDay());
  constructor(
    public dialogRef: MatDialogRef<CarRentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarsModel,
    private formBuilder: FormBuilder,
    private rentService: RentService

  ) { }

  get wypozyczenieOd() {
    return this.form.get('rentDetails.wypozyczenieOd');
  }

  get wypozyczenieDo() {
    return this.form.get('rentDetails.wypozyczenieDo');
  }

  get imie() {
    return this.form.get('tenant.imie');
  }

  get nazwisko() {
    return this.form.get('tenant.nazwisko');
  }

  get pesel() {
    return this.form.get('tenant.pesel');
  }

  get nip() {
    return this.form.get('tenant.nip');
  }

  get numerDowoduOsobistego() {
    return this.form.get('tenant.numerDowoduOsobistego');
  }

  get adres() {
    return this.form.get('tenant.adres');
  }

  get email() {
    return this.form.get('tenant.email');
  }

  get telefon() {
    return this.form.get('tenant.telefon');
  }

  ngOnInit(): void {
    this.car = this.data;
    this.form = this.generateForm();
  }

  generateForm() {
    return this.formBuilder.group({
      rentDetails: this.formBuilder.group({
        idPojazdu: [this.car.id],
        wypozyczenieOd: [null, { validator: [Validators.required] }],
        wypozyczenieDo: [null, { validator: [Validators.required] }],
      }),
      tenant: this.formBuilder.group({
        imie: ['', Validators.required],
        nazwisko: ['', Validators.required],
        pesel: ['', Validators.required],
        nip: [''],
        numerDowoduOsobistego: ['', Validators.required],
        adres: ['', Validators.required],
        email: ['', Validators.email],
        telefon: ['', Validators.required]
      }),
    });
  }

  cancel() {
    this.dialogRef.close({ status: false });
  }

  rent() {
    if (!this.form.valid) {
      return;
    }

    const rent = this.form.value as RentNewCarModel;
    rent.car = {
      blobId: this.car.blobId,
      id: this.car.id,
      marka: this.car.marka,
      model: this.car.model,
      mocSilnika: this.car.mocSilnika,
      cena: this.car.cena,
      dodatkoweInformacje: this.car.dodatkoweInformacje,
      status: CarStatusEnum.doAkceptacji,
      waga: this.car.waga,
      pojemnoscSilnika: this.car.pojemnoscSilnika,
      rodzajSilnika: this.car.rodzajSilnika,
    };

    this.rentService.addRent(rent).subscribe((response) => {
      this.dialogRef.close({ status: true });
    });
  }
}
