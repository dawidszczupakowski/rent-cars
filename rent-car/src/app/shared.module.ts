import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class SharedModule { }
