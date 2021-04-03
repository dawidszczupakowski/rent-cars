import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  adminButtonLabel = 'Logowanie jako administrator';
  showLogout = false;

  constructor(private storageService: StorageService, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.storageService.guid$.subscribe((guid) => {
      setTimeout(() => {
        this.adminButtonLabel = guid ? 'Panel administratora' : 'Logowanie jako administrator';
        this.showLogout = !!guid;
      }, 0);
    });
  }

  logout() {
    this.adminService.logout(this.storageService.loggedUser).subscribe((res) => {
      this.storageService.setLoggedUser('');
      this.router.navigate(['/']);
    });
  }
}
