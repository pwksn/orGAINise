import { Task } from './../to-do/task.model';
import { TasksService } from './../to-do/tasks.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Router } from '@angular/router';
import { AuthService, AuthResponseData } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from './helpers/must-match.validator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public isLoggingMode: boolean = true;
  public isLoading: boolean = false;
  public errorMsg: string = null;
  private invitationalTasks: Task[] = [];
  private taskCombined: Task[] = [];

  authForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dataStorageService: DataStorageService,
    private tasksService: TasksService
  ) { }

  get form() { return this.authForm.controls; }

  get userName() { return this.authForm.get('userName') };

  get userPassword() { return this.authForm.get('userPassword')};

  get userPasswordRepeat() { return this.authForm.get('userPasswordRepeat')};

  // get userNick() { return this.authForm.get('userNick')};

  ngOnInit(): void {
    this.initForm();
  }

  onToggleMode() {
    this.isLoggingMode = !this.isLoggingMode;
    this.errorMsg = '';
    this.initForm();
  }

  onAuthSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    const email = this.authForm.value['userName'];
    const password = this.authForm.value['userPassword'];

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoggingMode) {
      authObs = this.authService.logIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(resData => {
      console.log(resData);
      // this.isLoading = false;
      console.log(resData.idToken);
      this.dataStorageService.localId = resData.localId;
      this.tasksService.currentUserMail = resData.email;
      this.dataStorageService.fetchInvitations(resData.email).subscribe(
        fetchedInvitations => {
          if (!!fetchedInvitations) {
            for (let [uid, task] of Object.entries(fetchedInvitations)) {
              console.log(task);
              task.isInvitational = true;
              this.invitationalTasks.push(task);
            }
          }
          console.log(this.invitationalTasks);
          this.dataStorageService.fetchTasks().subscribe(
            fetchedTasks => {
              console.log(fetchedTasks);
              if(!fetchedTasks) {
                this.taskCombined = this.invitationalTasks;
              } else {
                this.taskCombined = fetchedTasks.concat(this.invitationalTasks);
              }
              this.taskCombined ? this.tasksService.sortTasksByDay(this.taskCombined) : null;
              this.router.navigate(['/todo/today']);
              this.isLoading = false;
            }
          );
        }
      );
    }, errorMsg => {
      console.log(errorMsg);
      this.errorMsg = errorMsg;
      this.isLoading = false;
    });

    this.authForm.reset();
  }

  private initForm() {

    if (this.isLoggingMode) {
      this.authForm = this.formBuilder.group({
        userName: ['pawelkopciara@interia.pl', [Validators.required, Validators.email]],
        userPassword: ['haslo123', [Validators.required, Validators.minLength(6)]]
      })
    } else {
      this.authForm = this.formBuilder.group({
        userName: ['', [Validators.required, Validators.email]],
        userPassword: ['', [Validators.required, Validators.minLength(6)]],
        userPasswordRepeat: ['', [Validators.required, Validators.minLength(6)]],
        // userNick: ['', Validators.required]
      },
      {
        validators: MustMatch('userPassword', 'userPasswordRepeat')
      })
    }
  }

}
