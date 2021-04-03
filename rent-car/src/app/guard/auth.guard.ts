// third-party
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { StorageService } from '../services/storage.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate() {
    if (this.storageService.loggedUser) {
      return true;
    }
    this.router.navigate(['/admin/login']);
    return true;
  }
}
