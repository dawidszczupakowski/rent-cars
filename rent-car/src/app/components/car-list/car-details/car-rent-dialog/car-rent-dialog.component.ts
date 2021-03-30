import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarsModel } from 'src/app/models/cars.model';

@Component({
  selector: 'app-car-rent-dialog',
  templateUrl: './car-rent-dialog.component.html',
  styleUrls: ['./car-rent-dialog.component.scss'],
})
export class CarRentDialogComponent implements OnInit {
  car: CarsModel;
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CarRentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarsModel,
    private formBuilder: FormBuilder,

  ) {}

  ngOnInit(): void {
    this.car = this.data;
    this.form = this.generateForm();
  }

  generateForm() {
    return this.formBuilder.group({
      idPojazdu: [this.car.id],
      wypozyczenieOd: [null, { validator: [Validators.required]}],
      wypozyczenieDo: [null, { validator: [Validators.required]}],
      tenant: this.formBuilder.group({
        imie: ['', Validators.required],
        nazwisko: ['', Validators.required],
        pesel: ['', Validators.required],
        nip: ['', Validators.required],
        numberDowoduOsobistego: ['', Validators.required],
        adres: ['', Validators.required],
      })
    });
  }

  cancel(){
    this.dialogRef.close({status: false});
  }

  rent() {
    if (!this.form.valid) {
      return;
    }
    this.dialogRef.close({status: true});
  }
}
