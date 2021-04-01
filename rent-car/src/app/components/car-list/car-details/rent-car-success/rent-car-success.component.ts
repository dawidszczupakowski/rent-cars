import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rent-car-success',
  templateUrl: './rent-car-success.component.html',
  styleUrls: ['./rent-car-success.component.scss']
})
export class RentCarSuccessComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RentCarSuccessComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
