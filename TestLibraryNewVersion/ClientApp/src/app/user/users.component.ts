import { Component } from "@angular/core";
import { User } from "./user";
import { Router } from "@angular/router";
import { UserService } from "./user.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
})
export class UsersComponent {
    public users: User[];

    constructor(private router: Router, private service: UserService) {
        this.service.getUsers()
            .toPromise()
            .then((result: any) => {
                this.users = result;
            });
    }

    load() {
        this.service.getUsers().subscribe((data: User[]) => this.users = data);
    }

    delete(id: string) {
        this.service.deleteUser(id).subscribe(data => this.load());
    }
}
