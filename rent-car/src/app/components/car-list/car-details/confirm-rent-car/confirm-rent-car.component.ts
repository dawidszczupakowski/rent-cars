import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RentNewCarModel } from 'src/app/models/rent.model';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-confirm-rent-car',
  templateUrl: './confirm-rent-car.component.html',
  styleUrls: ['./confirm-rent-car.component.scss']
})
export class ConfirmRentCarComponent implements OnInit {
  zgoda = false;
  regulamin = false;
  constructor(
    public dialogRef: MatDialogRef<ConfirmRentCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RentNewCarModel,
    private rentService: RentService) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close({ status: false });
  }

  confirmRent() {
    if (!this.zgoda && !this.regulamin) {
      return;
    }

    this.rentService.addRent(this.data).subscribe(() => {
      this.dialogRef.close({ status: true });
    });
  }
}
