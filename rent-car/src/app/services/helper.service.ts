import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  title: BehaviorSubject<string> = new BehaviorSubject<string>('Dostępne samochody');

  constructor() { }

  setTitle(title: string): void {
    this.title.next(title);
  }
}
