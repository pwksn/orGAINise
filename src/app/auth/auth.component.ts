import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from './helpers/must-match.validator';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public isLoggingMode: boolean = true;
  authForm: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) { }

  get form() { return this.authForm.controls; }

  get userName() { return this.authForm.get('userName') };

  get userPassword() { return this.authForm.get('userPassword')};

  get userPasswordRepeat() { return this.authForm.get('userPasswordRepeat')};

  get userNick() { return this.authForm.get('userNick')};

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
    console.log(this.form);
  }

  private initForm() {
    // if (this.isLoggingMode) {
    //   let uName = '';
    //   let uPwd = '';

    //   this.authForm = new FormGroup({
    //     'userName': new FormControl(uName, Validators.required),
    //     'userPassword': new FormControl(uPwd, [Validators.required, Validators.minLength(6)])
    //   });
    // } else {
    //   let uName = '';
    //   let uPwd = '';
    //   let uPwdConfirm = '';
    //   let uNick = '';

    //   this.authForm = new FormGroup({
    //     'userName': new FormControl(uName, Validators.required),
    //     'userPassword': new FormControl(uPwd, [Validators.required, Validators.minLength(6)]),
    //     'userPasswordRepeat': new FormControl(uPwdConfirm, Validators.required),
    //     'userNick': new FormControl(uNick, Validators.required)
    //   });
    // }

    if (this.isLoggingMode) {
      this.authForm = this.formBuilder.group({
        userName: ['', Validators.required],
        userPassword: ['', [Validators.required, Validators.minLength(6)]]
      })
    } else {
      this.authForm = this.formBuilder.group({
        userName: ['', Validators.required],
        userPassword: ['', [Validators.required, Validators.minLength(6)]],
        userPasswordRepeat: ['', [Validators.required, Validators.minLength(6)]],
        userNick: ['', Validators.required]
      },
      {
        validators: MustMatch('userPassword', 'userPasswordRepeat')
      })
    }
  }


}
