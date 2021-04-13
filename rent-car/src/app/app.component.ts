import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rent-car';
  loader = false;
  constructor(private loaderService: LoaderService) {
    this.loaderService.loader.subscribe(status => {
      setTimeout(() => {
        this.loader = status;
      }, 0);
    });
  }
}
