import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarStatusEnum } from 'src/app/enums/car-status.enum';
import { CarsModel, CarsWithPhotoModel } from 'src/app/models/cars.model';
import { BlobService } from 'src/app/services/blob.service';
import { CarsService } from 'src/app/services/cars.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-add-edit-car-dialog',
  templateUrl: './add-edit-car-dialog.component.html',
  styleUrls: ['./add-edit-car-dialog.component.scss']
})
export class AddEditCarDialogComponent implements OnInit {
  form: FormGroup;
  carStatusEnum = CarStatusEnum;
  images: string[] = [];
  blobId = 0;
  statusOption = [
    {
      status: this.carStatusEnum.nieaktywny,
      name: 'Nieaktywny',
      color: 'red'
    },
    {
      status: this.carStatusEnum.wolny,
      name: 'Wolny',
      color: 'green'
    },
  ];
  isEdit = false;

  constructor(public dialogRef: MatDialogRef<AddEditCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarsWithPhotoModel, 
    private formBuilder: FormBuilder, 
    private blobService: BlobService, 
    private carsService: CarsService,
    private storageService: StorageService) { }

  get marka() {
    return this.form.get('marka');
  }

  get model() {
    return this.form.get('model');
  }

  get rodzajSilnika() {
    return this.form.get('rodzajSilnika');
  }

  get mocSilnika() {
    return this.form.get('mocSilnika');
  }

  get pojemnoscSilnika() {
    return this.form.get('pojemnoscSilnika');
  }

  get waga() {
    return this.form.get('waga');
  }

  get dodatkoweInformacje() {
    return this.form.get('dodatkoweInformacje');
  }

  get cena() {
    return this.form.get('cena');
  }

  get status() {
    return this.form.get('status');
  }

  ngOnInit() {
    this.form = this.buildForm();
    if (this.data) {
      this.isEdit = true;
      this.form.patchValue(this.data);
      this.images = this.data.blob;
      this.blobId = this.data.blobId;
    }
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      marka: ['', Validators.required],
      model: ['', Validators.required],
      rodzajSilnika: ['', Validators.required],
      mocSilnika: ['', Validators.required],
      pojemnoscSilnika: ['', Validators.required],
      waga: ['', Validators.required],
      dodatkoweInformacje: ['', Validators.required],
      cena: ['', Validators.required],
      status: [this.carStatusEnum.wolny, Validators.required],
    });
  }

  addCar() {
    if (!this.form.valid) {
      return;
    }
    const car = this.form.value as CarsModel;
    delete car['blob'];

    const blob = {
      id: null,
      blob: JSON.stringify(this.images)
    }

    this.blobService.uploadFiles(blob).subscribe(resp => {
      car.blobId = resp;
      this.carsService.createCar(this.storageService.loggedUser, car).subscribe(resp => {
        this.dialogRef.close();
      })
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    const car = this.form.value as CarsModel;
    car.id = this.data.id;
    delete car['blob'];

    const blob = {
      id: this.blobId,
      blob: JSON.stringify(this.images)
    }
    
    this.blobService.uploadFiles(blob).subscribe(resp => {
      this.carsService.updateCar(this.storageService.loggedUser, car).subscribe(resp => {
        this.dialogRef.close();
      })
    });
  }

  deleteImg(idx: number) {
    this.images.splice(idx, 1);
  }

  fileProgress(fileInput: any) {
    const files = <FileList>fileInput.target.files;
    for (let i = 0; i < files.length; i++) {
      var reader = new FileReader();
      reader.readAsDataURL(<File>fileInput.target.files[i]);
      reader.onload = (_event) => {
        this.images.push(reader.result.toString());
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}
