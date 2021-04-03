import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RentModel } from 'src/app/models/rent.model';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-confirm-rent',
  templateUrl: './confirm-rent.component.html',
  styleUrls: ['./confirm-rent.component.scss']
})
export class ConfirmRentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmRentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RentModel,
    private rentService: RentService) { }

  ngOnInit() {
  }

}
