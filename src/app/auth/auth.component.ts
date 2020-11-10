import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public isLoggingMode: boolean = true;
  authForm: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  onToggleMode() {
    this.isLoggingMode = !this.isLoggingMode;
    this.initForm();
  }

  onAuthSubmit() {
    if (this.isLoggingMode) {
      console.log(this.authForm.value['userName']);
      console.log(this.authForm.value['userPassword']);
    } else {
      console.log(this.authForm.value['userName']);
      console.log(this.authForm.value['userPassword']);
      console.log(this.authForm.value['userPasswordRepeat']);
      console.log(this.authForm.value['userNick']);
    }
  }

  private initForm() {
    if (this.isLoggingMode) {
      let uName = '';
      let uPwd = '';

      this.authForm = new FormGroup({
        'userName': new FormControl(uName, Validators.required),
        'userPassword': new FormControl(uPwd, [Validators.required, Validators.minLength(6)])
      });
    } else {
      let uName = '';
      let uPwd = '';
      let uPwdConfirm = '';
      let uNick = '';

      this.authForm = new FormGroup({
        'userName': new FormControl(uName, Validators.required),
        'userPassword': new FormControl(uPwd, [Validators.required, Validators.minLength(6)]),
        'userPasswordRepeat': new FormControl(uPwdConfirm, Validators.required),
        'userNick': new FormControl(uNick, Validators.required)
      });
    }
  }


}
