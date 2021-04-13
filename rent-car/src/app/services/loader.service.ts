import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loader: Subject<boolean> = new Subject();

  constructor() { }

  loaderOn() {
    this.loader.next(true);
  }

  loaderOff() {
    this.loader.next(false);
  }
}
