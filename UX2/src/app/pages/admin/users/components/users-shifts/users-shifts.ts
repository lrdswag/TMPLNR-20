import {Component, OnInit} from "@angular/core";
import {UsersService} from "../../services/users.service";
import {Storage} from "@ionic/storage";
import {Router, ActivatedRoute} from "@angular/router";
import {User} from "../../../../../interfaces/user.interface";
import {Observable, Subscription} from "rxjs";
import {ScheduledShift} from "../../../../../interfaces/shifts.interface";
import {UserTrackerError} from "../../services/user-errors.interface";

@Component({
  selector: 'app-users-shifts',
  templateUrl: './users-shifts.html',
  styleUrls: ['./users-shifts.scss'],
})

export class UsersShiftsPage implements OnInit {

  userShifts$: Observable<ScheduledShift[]>;
  userShifts: ScheduledShift[];

  user$: Observable<User>;
  user: User | UserTrackerError;

  constructor(
    private userService: UsersService,
    private storage: Storage,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  async ngOnInit() {
     const id = await this.route.snapshot.paramMap.get('id');
     this.loadUserShifts(id).subscribe((data: ScheduledShift[]) => this.userShifts = data);
     this.loadUser(id).subscribe((data: User) => this.user = data);
  }

  loadUser(id: string): Observable<User | UserTrackerError> {
    return this.userService.getUserById(id);
  }

   loadUserShifts(id: string): Observable<ScheduledShift[] | UserTrackerError> {
    return this.userService.loadAllUsersShifts(id);
  }
}