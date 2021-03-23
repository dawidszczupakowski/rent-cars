import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  title: Observable<string> = this.helperService.title;

  constructor(private helperService: HelperService) { }

  ngOnInit(): void {
  }

}