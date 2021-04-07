import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarsModel } from 'src/app/models/cars.model';

@Component({
  selector: 'app-add-car-dialog',
  templateUrl: './add-car-dialog.component.html',
  styleUrls: ['./add-car-dialog.component.scss']
})
export class AddCarDialogComponent implements OnInit {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddCarDialogComponent>, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({

    });
  }

  addCar() {
    if(!this.form.valid) {
      return;
    }

    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
