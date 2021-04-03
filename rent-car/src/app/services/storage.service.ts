import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly guid = 'guid';
  guid$: BehaviorSubject<string> = new BehaviorSubject('');

  get loggedUser(): string {
    this.guid$.next(this.getLoggedUser());
    return this.getLoggedUser();
  }

  constructor() { }

  setLoggedUser(guid: string) {
    this.guid$.next(guid);
    if (!guid) {
      sessionStorage.removeItem(this.guid);
      return;
    }

    sessionStorage.setItem(this.guid, JSON.stringify(guid));
  }

  getLoggedUser(): string {
    return JSON.parse(sessionStorage.getItem(this.guid));
  }
}
