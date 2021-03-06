import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';;
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from "../../admin/users/services/users.service";
import {tap} from "rxjs/operators";
import {User} from "../../../interfaces/user.interface";
import {Storage} from "@ionic/storage";


@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.page.html',
  styleUrls: ['./profile-user.page.scss'],
})
export class ProfileUserPage implements OnInit {

  user: User;

  form: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private usersService: UsersService,
    private storage: Storage
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.usersService.getUserById(id).subscribe((data: User) => this.user = data);

    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      contactNumber: [''],
      email: [''],
      profilePicture: ['']
    });
  }

  editUserDetails() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.form.dirty) {
        const f = { ...this.user, ...this.form.value };
        this.loading = true;
        this.usersService.editUser(f)
          .pipe(
            tap(_ => alert('Details Updated! Please login again for changes to take effect.')),
              tap(async _ => await this.storage.clear().then(() => {
                this.router.navigateByUrl('/login');
              }) )
          ).subscribe((data: User) => this.user = data);
      }
    }
  }
}
