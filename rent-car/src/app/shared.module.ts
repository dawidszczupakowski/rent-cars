import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md'

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MDBBootstrapModule.forRoot(),
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MDBBootstrapModule,
    ]
})
export class SharedModule { }
