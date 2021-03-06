import {Component, OnInit} from '@angular/core';
import {User} from '../../../../../interfaces/user.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from "../../services/users.service";
import {tap} from "rxjs/operators";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.html',
  styleUrls: ['./add-user.scss'],
})
export class AddUserPage implements OnInit {

  pageTitle = 'Add Employee';
  submitted = false;
  loading = false;
  user: User;
  form: FormGroup;
  date = new Date();

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }



  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    public alertController: AlertController,
    private router: Router
  ) {

    this.form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        contactNumber: ['', Validators.required],
        wagePerHour: ['', Validators.required],
        profilePicture: [''],
        roles: [['ROLE_USER', 'ROLE_ADMIN'], Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: this.MustMatch('password', 'confirmPassword')
      });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {

setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      if (this.form.dirty) {
        const f = {...this.user, ...this.form.value};
        this.userService.addUser(f).pipe(
          tap(_ => console.log('New User Added!')),
            tap((data: User) => this.router.navigateByUrl(`/users/${data.id}/details`))
        ).subscribe(data => this.user = data);
      }
    }
  }
}

