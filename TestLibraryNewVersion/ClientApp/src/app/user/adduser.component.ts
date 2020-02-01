import { Component } from "@angular/core";
import { User } from "./user";
import { UserService } from "./user.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: './adduser.component.html',
})
export class AddUserComponent {
    public users: User[];
    public user: User = new User();

    constructor(private router: Router, private activateRoute: ActivatedRoute, private service: UserService) {
        this.service.getUsers()
            .toPromise()
            .then(resp => {
                this.getUsers();
            });
    }

    private getUsers() {
        this.service.getUsers().subscribe((result: User[]) => {
            this.users = result;
        });
    }

    save(user: User) {
        console.log(user);
        this.service.createUser(user).subscribe((response: User) => {
            this.user = response;
            this.router.navigate(['/users']);
        });
    }

    cancel() {
        this.router.navigate(['/users']);
    }
}
