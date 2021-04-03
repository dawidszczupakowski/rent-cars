import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginSuccessModel } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/admin.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private helperService: HelperService,
    private adminService: AdminService,
    private storageService: StorageService,
  ) { }

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

  submit() {
    if (!this.form.valid) {
      return;
    }

    this.adminService.login(this.form.value).subscribe((loginSucc: LoginSuccessModel) => {
      this.storageService.setLoggedUser(loginSucc.guid);
      document.location.href = '/admin/panel-admin';
    });
  }
}
