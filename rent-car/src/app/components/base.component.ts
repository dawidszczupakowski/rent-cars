import { Component, OnInit } from '@angular/core';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  title = '';

  constructor(private helperService: HelperService) { }

  ngOnInit(): void {
    this.helperService.title$.subscribe((title) => {
      setTimeout(() => {
        this.title = title;
      }, 0);
    });
  }

}
