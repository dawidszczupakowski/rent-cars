import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private helperService: HelperService) { }

  get login() {
    return this.form.get('login');
  }

  get haslo() {
    return this.form.get('haslo');
  }

  ngOnInit() {
    this.helperService.setTitle('Panel administratora');
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      haslo: ['', Validators.required]
    });
  }

}
