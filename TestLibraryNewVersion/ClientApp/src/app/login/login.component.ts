import { Component } from "@angular/core";
import { Login } from "./login";
import { Router } from "@angular/router";
import { AuthenticationService } from "../auth/authentication.service";

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    model: Login = new Login();
    loading = false;

    constructor(private router: Router, private authService: AuthenticationService) { }

    login() {
        this.loading = true;
        this.authService.login(this.model.username, this.model.password).subscribe((response: any) => {
            this.loading = false;
            this.router.navigate(['/']);
        }, (error: any) => {
            let temp = error;
            alert("Invalid login or password!");
            this.loading = false;
        });
    }
}
