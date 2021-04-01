import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlobModel } from '../models/blob.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
    providedIn: 'root',
})
export class BlobService {
    constructor(private http: HttpClient) { }

    getBlobFile(blobId: number): Observable<BlobModel> {
        return this.http.get<ResponseModel<BlobModel>>(`blob/${blobId}`).pipe(
            map((response) => response.result),
            map((blob: any) => {
                blob.blob = JSON.parse('[' + blob.blob + ']');
                return blob;
            }));
    }
}
