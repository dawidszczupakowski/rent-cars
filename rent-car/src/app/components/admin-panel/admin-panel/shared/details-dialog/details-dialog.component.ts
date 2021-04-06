import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RentStatusEnum } from 'src/app/enums/rent-status.enum';
import { RentInfoModel } from 'src/app/models/rent-info.model';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss']
})
export class DetailsDialogComponent implements OnInit {
  rentInfo: RentInfoModel;
  statusRent = RentStatusEnum;
  constructor(public dialogRef: MatDialogRef<DetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RentInfoModel,) { }

  ngOnInit() {
    this.rentInfo = this.data;
  }

  close() {
    this.dialogRef.close();
  }

}
